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
import VideoPlayer from 'react-simple-video-player';
import 'firebase/firestore'
import 'firebase/functions';
class Pin extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{},images:{},video:{},price:{},place_id:{},business_number:{},business_status:{}};
      }    
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
      
    componentDidMount() {
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
            this.setState({price:this.state.data.attributes[1].text.toString()})
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
                var place_info = JSON.parse(res.data);
                console.log(place_info)
                var business_status = place_info.business_status;
                console.log(place_info.opening_hours.weekday_text);
                this.setState({business_number:place_info.formatted_phone_number.toString()});
                if(business_status == "OPERATIONAL"){
                    if(place_info.opening_hours.weekday_text){
                        var open_right_now = result.open_now;
                        if(open_right_now){
                            this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+"，营业中"})
                        }else{
                            this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+",已关门"})
                        }
                       
                    }else{
                        this.setState({business_status:"正常营业，具体时间请咨询商家。"})
                    }
                }else if(business_status =="CLOSED_TEMPORARILY"){
                    this.setState({business_status:"暂时关闭"})
                }else if(business_status == "CLOSED_PERMANENTLY"){
                    this.setState({business_status:"永久停业"})
                }else{
                    this.setState({business_status:"无"})
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
                            <div id="openappbtn" onClick={openapp}>
                                <div id="openapp" onClick={openapp}>打开App</div>
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
                        { !this.state.video ? <Carousel showIndicators={this.state.images.length>1?true:false} images={this.state.images} /> : null }
                        { this.state.video ? <VideoPlayer url={this.state.video} poster={this.state.images[0]} width={400} height={300}/>: null}
                                 
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
                            <h1>{this.state.data.placeName}</h1> 
                            <h3>{this.state.data.title}</h3>                  
                            <p>{this.state.data.subTitle}</p>
                        </div>
                    </div>
                    <div id="otherinfo">
                    {/* <div>
                            <img src="/online-shop.png" className="otherintro_icon"/>
                            <span>{this.state.data.address}</span>
                    </div>
                    <div>
                        <img src="/online-shop.png" className="otherintro_icon"/>{this.state.price.toString()}
                    </div> */}
                    <table id="otherinfo_table">
                        <tr>
                            <td className="info_name"><img src="/online-shop.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.data.address}
                            </td>
                        </tr>
                        <tr>
                            <td className="info_name"><img src="/finance.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.price.toString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="info_name"><img src="/call.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.business_number.toString()}
                            </td>
                        </tr>
                        <tr>
                            <td className="info_name"><img src="/clock.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.business_status.toString()}
                            </td>
                        </tr>
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