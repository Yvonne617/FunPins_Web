import React, { Component } from 'react';
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

function Footer(props) {
    
    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <input id="comment" placeholder="评论一下..." disabled="disabled"></input>
                <div id="likeSpan"><img id="footerBtn" src="赞.png"></img>{ props.numOfLiked }人赞了 <img id="footerBtn" src="fire.png"></img>去了 <img id="footerBtn" src="爱心.png"></img>想去 </div>
            </div>
        </div>
    )
}

export default Footer