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
import openapp from './downloadApp';
import 'firebase/firestore'
import 'firebase/functions';
class Pin extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{},images:["https://firebasestorage.googleapis.com/v0/b/dianquan.appspot.com/o/GbkbJDMpbAWAY6fhy3clFqFki8z2%2FpinImage%2F21B5C1C5-50E6-4F19-B757-CEF6E67A2BDE.jpeg?alt=media&token=1da3860f-0828-46dd-ab01-b2aa1633a26d"],video:{},price:{},place_id:{},placeName:{},business_number:{},business_status:{}};
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
                }
              })
              .catch(err => {
                console.log('Error getting user', err);
              });

            checkPlaceAttributes({placeId:this.state.place_id.toString(),curTime:cur_time}).then(result => {
                  // Read result of the Cloud Function.
                var res = result.data;
                console.log(result)
                var place_info = JSON.parse(res.data);
                var business_status = place_info.business_status;
                this.setState({business_number:place_info.formatted_phone_number});
                this.setState({price:place_info.price_level});
                this.setState({placeName:place_info.name})
                if(business_status == "OPERATIONAL"){
                    if(place_info.opening_hours.weekday_text){
                        var open_right_now = res.open_now;
                        if(open_right_now){
                            this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+"，营业中"})
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
                    this.setState({business_status:{}})
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
            window.location = result.data;
        console.log(result.data)
        })
    }
    render() {
        return (
            <div id="outer-container2">
                <StickyHeader
                    // This is the sticky part of the header.
                    header={
                    <div className="Header_root">
                        <div className="Header_title">
                            <div id="funpinsheader">
                                <img id="dqlogo" src="/dianquanLogo.png"></img>
                                <div id="dq">点圈,</div>
                                <div id="dt">用地图标记生活</div>
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
                        <Carousel isvideo={this.state.video} video={this.state.video} videoposter={this.state} showIndicators={this.state.images.length>1?true:false} images={this.state.images}/> 
                      
                                 
                    </div> 
                </Grid.Column>
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div id="content">
                        <div className="author">
                        <Image className="author_icon" src={this.state.userinfo.avatar} size='small' circular />
                        <span className="author_name">{this.state.userinfo.name}</span>
                        <span className="author_intro">{this.state.userinfo.badge}</span>
                        </div>
                        <hr></hr>
                        <div className="pin_intro">
                            <h3>{this.state.data.title}</h3>                  
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
                    
                </Grid.Column>
            </Grid.Row>
           
            </Grid>
            </main>
            </div>
        )
    }
}
export default Pin;