import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import firebase from './firebase';
import './style/Pins.css';
import Carousel from './Carousel';
import Menu from './topmenu';
import 'react-sticky-header/styles.css';
import { Table } from 'semantic-ui-react'
import StickyHeader from 'react-sticky-header';
import StickyFooter from './StickyFooter';
import 'firebase/firestore'
import 'firebase/functions';
import { ConsoleWriter } from 'istanbul-lib-report';

class Pin extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{},images:["/bg.png"],video:null,price:null,place_id:null,address:null,placeName:null,business_number:null,business_status:null,comments:[],numOfLiked:0};
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
        db.collection("pins").doc(this.props.match.params.id).collection("numOfLikedShards").get().then(
            querySnapshot=> {
                querySnapshot.forEach(doc=> {
                    this.setState({numOfLiked:this.state.numOfLiked+doc.data().count})
                })}
        )
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
            this.setState({address:this.state.data.address})
            // this.setState({numOfLiked:this.state.data.numOfLiked})
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
                if(res){
                    var place_info = JSON.parse(res.data);
                    var business_status = place_info.business_status;
                    console.log("placeinfo:",place_info)
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
                            if(cday == 0){
                                this.setState({business_status:place_info.opening_hours.weekday_text[6]+"，已关门"})
                            }else{
                                this.setState({business_status:place_info.opening_hours.weekday_text[cday-1]+"，已关门"})
                            }
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
        db.collection("pins").doc(this.props.match.params.id).collection("comments").get().then(querySnapshot=> {
            querySnapshot.forEach(doc=> {
                var temp_comment_arr= {comment_content:null,sender_id:null,receiver_id:null,sender_avator:null,sender_name:null,receiver_name:null}
                const comment_content = doc.data().content
                const sender_id = doc.data().sender
                const receiver_id = doc.data().receiver
                temp_comment_arr.comment_content = comment_content
                temp_comment_arr.sender_id= sender_id
                temp_comment_arr.receiver_id = receiver_id
                //get sender avator and name
                db.collection("users").doc(sender_id).get().then(doc => {
                    if (!doc.exists) {
                      console.log('No such user!');
                    } else {
                        const sender_avator = doc.data().avatar
                        const sender_name = doc.data().name
                        temp_comment_arr.sender_avator= sender_avator
                        temp_comment_arr.sender_name = sender_name
                        if(receiver_id != ""){
                            db.collection("users").doc(receiver_id).get().then(doc => {
                                if (!doc.exists) {
                                  console.log('No such user!');
                                } else {
                                    const receiver_name = doc.data().name
                                    temp_comment_arr.receiver_name = receiver_name
                                    var joined = this.state.comments.concat([temp_comment_arr]);
                                    this.setState({ comments: joined })
                                    //this.state.comments.push(temp_comment_arr)
                                    console.log("comments:",this.state.comments)
                                }
                              })
                              .catch(err => {
                                console.log('Error getting user', err);
                              });
                        }else{
                            var joined = this.state.comments.concat([temp_comment_arr]);
                            this.setState({ comments: joined })
                           // this.state.comments.push(temp_comment_arr)
                            console.log("comments:",this.state.comments)
                        }
                    }
                  })
                  .catch(err => {
                    console.log('Error getting user', err);
                  }); 
           
            });
        })
        .catch(err => {
            console.log('Error getting comments', err);
          })

        
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        
      }
     createDynamicLink = () =>{
        const generateDynamicLink = firebase.functions().httpsCallable('generateDynamicLinkV2');
        generateDynamicLink({pinId:this.props.match.params.id.toString()}).then(result => {
            window.location = result.data.shortLink;
        })
        const url = "https://dianquan.page.link/?link=https://dianquan.page.link/?pinId%3D" + this.props.match.params.id + "&apn=com.dianquan.dianquan_android&isi=1483535140&ibi=project.dianquan&ofl=https://funpins.co"
        window.location = url;
    }
    render() {
        return (
            <div id="outer-container2">
                <Helmet>
                    <title>{this.state.data.title}</title>
                </Helmet>
                <StickyHeader
                    // This is the sticky part of the header.
                    header={
                    <div className="Header_root">
                        <div className="author">
                            {   this.state.userinfo.id?
                                <Link to={"/User/"+this.state.userinfo.id}>
                                    <Image className="author_icon" src={this.state.userinfo.avatar?this.state.userinfo.avatar:"https://firebasestorage.googleapis.com/v0/b/dianquan.appspot.com/o/000userAvatars%2FdianquanLogo.png?alt=media&token=f4b22a50-c959-485d-9a2a-0646b4e06fcf"} size='small' circular />
                                </Link>
                                : ""
                            }
                            <span className="author_name" style={{fontSize: "1.5em"}}>{this.state.userinfo.name}</span>
                        </div>

                        {/*<img id="dqlogo" src="/dianquanLogo.png"></img>*/}
                        {/*<div id="dq" className="pintitle">点圈,</div>*/}
                        {/*<div id="dt" className="pinsubtitle">用地图标记生活</div>*/}

                        <div id="openappbtn" onClick={this.createDynamicLink}>
                            <div id="openapp" >打开App</div>
                        </div>
                    </div>
                    }
                >
                </StickyHeader>


           <main id="page-wrap2">
           <Grid centered>
           <Grid.Row style={{padding: "0px"}}>
               {/* image on the left */}
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className="parent3">
                        {/* <MyGaller height={this.state.width?this.state.width:window.innerWidth}/>       */}
                        <Carousel isvideo={this.state.video} video={this.state.video} showIndicators={this.state.images.length>1?true:false} images={this.state.images}/>
                    </div> 
                </Grid.Column>

               {/* text on the right side */}
                <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div id="content">
                        {/*post title*/}
                        <p className="pin_title">{this.state.data.title}</p>

                        {/*    <div className="author">*/}
                    {/*{   this.state.userinfo.id?*/}
                    {/*    <Link to={"/User/"+this.state.userinfo.id}>*/}
                    {/*        <Image className="author_icon" src={this.state.userinfo.avatar?this.state.userinfo.avatar:"https://firebasestorage.googleapis.com/v0/b/dianquan.appspot.com/o/000userAvatars%2FdianquanLogo.png?alt=media&token=f4b22a50-c959-485d-9a2a-0646b4e06fcf"} size='small' circular />*/}
                    {/*    </Link>*/}
                    {/*    : ""*/}
                    {/*}*/}
                    {/*    <span className="author_name">{this.state.userinfo.name}</span>*/}

                        {/*badge*/}
                        {/*<span className="author_intro">*/}
                        {/*    <img className="author_icon" src={this.state.userinfo.badge+'.png'} />*/}
                        {/*    <span id="badge">{this.state.userinfo.badge}</span>*/}
                        {/*</span>*/}
                        </div>
                        <hr id="horizontal-line" />
                        <div className="placeName">
                            <img id="mapIcon" src="/maps-and-location.png"></img>
                            <div className="placeStr">{this.state.placeName?this.state.placeName:""}</div>
                        </div>
                        <div className="pin_intro">
                            {/*<p className="pin_title">{this.state.data.title}</p>                  */}
                            {<p>{this.state.data.subTitle? this.state.data.subTitle.trimEnd():this.state.data.subTitle}</p>} 
                            <p className="dateBefore"> {Math.floor((new Date().getTime()-new Date(this.state.data.timeStamp*1000)) / (24 * 3600 * 1000))}天前</p>

                        {/*</div>*/}
                    </div>
                    <div id="otherinfo">
                    <table id="otherinfo_table">
            {this.state.address ?
                    <tbody>
                        <tr>
                            <td className="info_name"><img src="/online-shop.png" className="otherintro_icon"/></td>
                            <td className="info_td">
                                {this.state.address.toString()}
                            </td>
                        </tr>
                    </tbody>
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
            <div className="comments">
                <p>评论</p>
                {this.state.comments ?
                    <table id="otherinfo_table">
                        <tbody>
                            {this.state.comments.map(function(row, i){
                                return  (
                                    <tr>
                                        <td className="info_name"><img src={row.sender_avator} className="comment_user_icon"/></td>
                                        <td>
                                            <p>
                                                {row.sender_name}
                                            </p>
                                            {row.receiver_name? "@"+row.receiver_name+": "+row.comment_content:row.comment_content}
                                        </td>
                                    </tr>
                                )
                            
                            })}
                        </tbody>
                    </table>   
               
                : ""}
            </div>   
            </Grid.Column>
      
            </Grid.Row>
            </Grid>
            </main>

            <StickyFooter numOfLiked = {this.state.numOfLiked} pinId={this.props.match.params.id}/>
        </div>
        )
    }
}
export default Pin;


