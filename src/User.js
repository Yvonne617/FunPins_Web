import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import firebase from './firebase';
import './style/User.css';
import Carousel from './Carousel';
import Menu from './topmenu';
import 'react-sticky-header/styles.css';
import { Table } from 'semantic-ui-react'
import StickyHeader from 'react-sticky-header';
import 'firebase/firestore'
import  UserPinTabs from './UserPinsTabs'
import 'firebase/functions';
import $ from 'jquery';

class User extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{},images:["/bg.png"],video:null,price:null,place_id:null,address:null,placeName:null,business_number:null,business_status:null,comments:[],numOfLiked:0};
    }    
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        $('.user_icon').width($('.user_icon').height());
      };
      componentDidUpdate(){
        $('.user_icon').width($('.user_icon').height());
      }
 
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
        db.collection("users").doc(this.props.match.params.id).get().then(doc => {
          if (!doc.exists) {
            console.log('No such user!');
          } else {
            console.log('Document data:', doc.data());
            this.setState({userinfo: doc.data()});
          }
        })
        .catch(err => {
          console.log('Error getting user info', err);
        });
        $('.user_icon').width($('.user_icon').height());

      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        $('.user_icon').width($('.user_icon').height());

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
                {/* <Helmet>
                    <title>{this.state.data.title}</title>
                </Helmet> */}
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

           <main id="page-wrap3">
           <Grid>
           <Grid.Row>
                <Grid.Column mobile={5} tablet={6} computer={6}>
                    <div className="section">
                        <div className="author">
                            <Image className="user_icon" src={this.state.userinfo.avatar?this.state.userinfo.avatar:"https://firebasestorage.googleapis.com/v0/b/dianquan.appspot.com/o/000userAvatars%2FdianquanLogo.png?alt=media&token=f4b22a50-c959-485d-9a2a-0646b4e06fcf"} circular />
                            <div className="user_sub_info">
                                <span className="author_name">{this.state.userinfo.name}</span><Image className="gender_icon" src={this.state.userinfo.gender == "female"?"/female.png":"/male.png"}/>
                                <div className = "badge_sect"><span className="badge">{this.state.userinfo.badge}</span></div>
                            </div>
                        </div>                       
                    </div>
                    
                </Grid.Column>
            
                <Grid.Column mobile={11} tablet={10} computer={10}>
                    <div className="section2"> 
                        <div className="sub_info">粉丝<div className="sub_info_num">{this.state.userinfo.followers?this.state.userinfo.followers.length:"-"}</div></div>
                        <div className="sub_info">关注<div className="sub_info_num">{this.state.userinfo.followings?this.state.userinfo.followings.length:"-"}</div></div>
                        <div className="sub_info">赞和想去<div className="sub_info_num">{this.state.userinfo.numOfLiked?this.state.userinfo.numOfLiked+this.state.userinfo.numOfWished:0}</div></div>
                        <div className="sub_info">标记<div className="sub_info_num">{this.state.userinfo.pins?this.state.userinfo.pins.length:'-'}</div></div>
                    </div>
                   
                </Grid.Column>
            </Grid.Row>
            <div className="self_intro">个人简介: {this.state.userinfo.selfDescription}</div>     
            
            </Grid>
            {this.state.userinfo.pins?
                <Grid centered>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="section">
                        <UserPinTabs pinIds= {this.state.userinfo.pins} wantToGoIds={this.state.userinfo.wishPins}/>
                        </div>
                    
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            :""
            }
           
           
               
            
            </main>
        </div>
        )
    }
}
export default User;


