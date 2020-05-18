import React, { Component } from 'react';
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
import firebase from './firebase';
export default class Pin extends Component {
    state = { width: 0, height: 0 ,data:{}};
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
      
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        // const db = firebase.firestore();
        // db.collection("pins").doc(this.props.match.params.id).get().then(doc => {
        //   if (!doc.exists) {
        //     console.log('No such document!');
        //   } else {
        //     console.log('Document data:', doc.data());
        //     this.setState({data: doc.data()});
        //   }
        // })
        // .catch(err => {
        //   console.log('Error getting document', err);
        // });
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        
      }
    render() {
        return (
            <div id="outer-container">
                <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
                <main id="page-wrap">
                <Grid centered>
                <Grid.Row id="row1" >
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                    {/* {this.state.data.address} */}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}