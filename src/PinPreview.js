import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'
import firebase from './firebase';
import $ from 'jquery';
class CardGroups extends Component {
  constructor (props){
    super(props);
    this.state = { width: 0, height: 0 ,data:{},user:{},pininfo:[],imgwidth:0};
  }    
  updateDimensions = () => {
    $('.Pin_Preview_Img').height($('.Pin_Preview_Img').width()*1.2);
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    
componentWillMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', this.updateDimensions);
    const db = firebase.firestore();
    this.props.pinIds.map((pinId, i)=>{
        db.collection("pins").doc(pinId).get().then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            var temp = doc.data()
            var joined = this.state.pininfo.concat([[temp.images[0].uri,temp.title,temp.ID]]);
            this.setState({ pininfo: joined })
  
          }
        }).catch(err => {
          console.log('Error getting user', err);
        });
;
    })
    
  }
  componentDidUpdate(){
    $('.Pin_Preview_Img').height($('.Pin_Preview_Img').width()*1.2);
  }
  createDynamicLink = (pinid) =>{
    const generateDynamicLink = firebase.functions().httpsCallable('generateDynamicLinkV2');
    generateDynamicLink({pinId:pinid.toString()}).then(result => {
        window.location = result.data.shortLink;
    })
}
  render() {
    return (
      <Card.Group>
        {this.state.pininfo?
            this.state.pininfo.map((pin, i) => {
                return  (
                  <Card>
                    <Card.Content>
                      <Image className="Pin_Preview_Img"
                        src={pin[0]} onClick={() => this.createDynamicLink(pin[2])}
                      />
                      <Card.Meta></Card.Meta>
                      <Card.Description>
                       {pin[1]}
                      </Card.Description>
                    </Card.Content>
          </Card>       
        )
        })
                  
        :"" }  
        </Card.Group>  
    )
   
  }
  
}

export default CardGroups