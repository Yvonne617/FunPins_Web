import React, { Component } from 'react';
import firebase from './firebase';
var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "left",
    padding: "0px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}
function createDynamicLink(pinID){
    const generateDynamicLink = firebase.functions().httpsCallable('generateDynamicLinkV2');
    generateDynamicLink({pinId:pinID.toString()}).then(result => {
        window.location = result.data.shortLink;
    console.log(result.data.shortLink)
    })
}
function Footer(props) {
    
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <input id="comment" placeholder="评论一下..." onClick={e =>createDynamicLink(props.pinId)}></input>
                <div id="likeSpan"><img id="footerBtn" src="赞.png" onClick={e => createDynamicLink(props.pinId)}></img>{ props.numOfLiked }人赞了 <img id="footerBtn" src="fire.png" onClick={e =>createDynamicLink(props.pinId)}></img>去了 <img id="footerBtn" src="爱心.png" onClick={e=>createDynamicLink(props.pinId)}></img>想去 </div>
            </div>
        </div>
    )
}

export default Footer