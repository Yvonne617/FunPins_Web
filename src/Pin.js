import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import firebase from './firebase';
import './style/Pins.css';
import Carousel from './Carousel';
import Menu from './topmenu';
import 'react-sticky-header/styles.css';
import { Table } from 'semantic-ui-react'
import StickyHeader from 'react-sticky-header';
import 'firebase/firestore'
import 'firebase/functions';
import { ConsoleWriter } from 'istanbul-lib-report';
class Pin extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{},images:["/bg.png"],video:null,price:null,place_id:null,placeName:null,business_number:null,business_status:null};
      }    
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
      
    componentDidMount() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', this.updateDimensions);
        const db = firebase.firestore();
        const checkPlaceAttributes = firebase.functions().httpsCallable('checkPlaceAttributes');
        var current_date = new Date()
        var cday = current_date.getDay()
        var chour = current_date.getHours()
        var cmin = current_date.getMinutes()
        var cur_time =  cday*2400 + chour*100 + cmin;
        db.collection("pins").doc(this.props.match.params.id).get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            this.setState({data: doc.data()});
            this.setState({user:this.state.data.owner})
            this.setState({video:this.state.data.video})
            this.setState({images:this.state.data.images.map((item) => item.uri)})
            this.setState({place_id:this.state.data.place_id})
            db.collection("users").doc(this.state.user.toString()).get().then(doc => {
                if (!doc.exists) {
                  console.log('No such user!');
                } else {
                  this.setState({userinfo: doc.data()});
                  console.log(this.state.userinfo)
                }
              })
              .catch(err => {
                console.log('Error getting user', err);
              });

            checkPlaceAttributes({placeId:this.state.place_id.toString(),curTime:cur_time}).then(result => {
                  // Read result of the Cloud Function.
                var res = result.data;
                console.log(res)
                if(res){
                    var place_info = JSON.parse(res.data);
                    var business_status = place_info.business_status;
                    console.log(business_status)
                    this.setState({business_number:place_info.formatted_phone_number});
                    this.setState({price:place_info.price_level});
                    this.setState({placeName:place_info.name})
                }
                
                if(business_status == "OPERATIONAL"){
                    if(place_info.opening_hours && place_info.opening_hours.weekday_text){
                        var open_right_now = res.open_now;
                        if(open_right_now){
                            if(cday == 0){
                                this.setState({business_status:place_info.opening_hours.weekday_text[6]+"，营业中"})
                            }else{
                                this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+"，营业中"})
                            }
                        }else{
                            this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+", 已关门"})
                        }
                       
                    }else{
                        this.setState({business_status:"正常营业，具体时间请咨询商家。"})
                    }
                }else if(business_status =="CLOSED_TEMPORARILY"){
                    this.setState({business_status:"暂时关闭"})
                }else if(business_status == "CLOSED_PERMANENTLY"){
                    this.setState({business_status:"永久停业"})
                }else{
                    this.setState({business_status:null})
                }

          });
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
        


      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        
      }
     createDynamicLink = () =>{
        const generateDynamicLink = firebase.functions().httpsCallable('generateDynamicLinkV2');
        console.log(this.props.match.params.id)
        generateDynamicLink({pinId:this.props.match.params.id.toString()}).then(result => {
            window.location = result.data.shortLink;
        console.log(result.data.shortLink)
        })
    }
    render() {
        return (
            <div id="outer-container2">
                <Helmet>
                    <title>标记详情</title>
                </Helmet>
                <StickyHeader
                    // This is the sticky part of the header.
                    header={
                    <div className="Header_root">
                        <div className="Header_title">
                            <div id="funpinsheader">
                                <img id="dqlogo" src="/dianquanLogo.png"></img>
                                <div id="dq" className="pintitle">点圈,</div>
                                <div id="dt" className="pinsubtitle">用地图标记生活</div>
                            </div>
                            <div id="openappbtn" onClick={this.createDynamicLink}>
                                <div id="openapp" >打开App</div>
                            </div>
                           
                        </div>
                        
                    </div>
                    }
                >
                    
                </StickyHeader>

           <main id="page-wrap2">
           <Grid centered>
           <Grid.Row>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className="parent3">
                        {/* <MyGaller height={this.state.width?this.state.width:window.innerWidth}/>       */}
                        <Carousel isvideo={this.state.video} video={this.state.video} showIndicators={this.state.images.length>1?true:false} images={this.state.images}/>                
                    </div> 
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div id="content">
                        <div className="author">
                        <Image className="author_icon" src={this.state.userinfo.avatar?this.state.userinfo.avatar:"https://firebasestorage.googleapis.com/v0/b/dianquan.appspot.com/o/000userAvatars%2FdianquanLogo.png?alt=media&token=f4b22a50-c959-485d-9a2a-0646b4e06fcf"} size='small' circular />
                        <span className="author_name">{this.state.userinfo.name}</span>
                        <span className="author_intro">
                            <img className="author_icon" src={this.state.userinfo.badge+'.png'} />
                            <span id="badge">{this.state.userinfo.badge}</span>
                        </span>
                        </div>
                        <hr></hr>
                        <div className="pin_intro">
                            <p className="pin_title">{this.state.data.title}</p>                  
                            <p>{this.state.data.subTitle}</p>
                        </div>
                    </div>
                    <div id="otherinfo">
                    <table id="otherinfo_table">
            {this.state.placeName ?
                        <tr>
                            <td className="info_name"><img src="/online-shop.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.placeName.toString()}
                            </td>
                        </tr>
                        :""
            }
            { this.state.price ?
                        <tr >
                            <td className="info_name"><img src="/finance.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                <img src={"/dollar"+this.state.price.toString()+".png"} className="otherintro_icon"/>
                            </td>
                        </tr>
                    :""
            }
            {this.state.business_number ?
                        <tr>
                            <td className="info_name"><img src="/call.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.business_number.toString()}
                            </td>
                        </tr>
                    :""
            }
            {this.state.business_status ?
                        <tr>
                            <td className="info_name"><img src="/clock.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.business_status.toString()}
                            </td>
                        </tr>
                    : ""
            }
                    </table>
            </div>
                    
            <div className="blurmap-container" onClick={this.createDynamicLink}>
                    <div className="blurmap"></div>
                    <div className="blurmap-text" >
                        下载点圈app，查看我的宝藏推荐地图
                    </div>
                </div>  
                </Grid.Column>
      
            </Grid.Row>
            </Grid>
            </main>
            </div>
        )
    }
}
export default Pin;


