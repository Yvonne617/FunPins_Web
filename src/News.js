import React, { Component } from 'react';
import Menu from './topmenu';
import firebase from './firebase';
import 'firebase/firestore';
import 'firebase/functions';
import {Helmet} from 'react-helmet';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image, List, Divider } from 'semantic-ui-react';
import News_article from './News_article'
import data from './data/articles.json'
export default class MenuExampleSecondary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          articles: [],
          width: 0, 
          height: 0
        }
      }
    // componentWillReceiveProps(Props){
    //     this.setState({articles: data.articles})
    // }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight});
      };
    componentDidMount() {
        this.setState({articles: data.articles})
        window.addEventListener('resize', this.updateDimensions);
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
    getArticles() {
        const getArticles = firebase.functions().httpsCallable('getWeChatArticles');
        getArticles({}).then(result => {
            console.log(result);
        });
    }
    renderArticles() {
        
        return this.state.articles.map((article, index) => {
            return (
                <News_article key={index} article={article} />
            )
        });
    }

    render() {
        this.getArticles();
        const articles = this.renderArticles();
        return (
            <div id="outer-container">
                <Helmet>
                    <style>{'body {background-image:url(/bg.jpeg);backdrop-filter: blur(5px);-webkit-backdrop-filter:blur(5px);min-height:100%'}</style>
                </Helmet>
                <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
                <main id="page-wrap">
                <Grid centered>
                <Grid.Row id="row1" >
                    <Grid.Column mobile={16} tablet={16} computer={10}>
                    <div>
                    <List selection bulleted>
                        {articles}
                    </List>
                    </div>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}
