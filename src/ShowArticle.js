import React, { Component } from 'react';
import {Icon,Header, Grid, List} from 'semantic-ui-react'
import {Helmet} from 'react-helmet';
import Menu from './topmenu';
import data from './data/articles.json'
import './style/ShowArticle.css'
class ShowArticle extends Component{

    state = {
        id: 0,
        width: 0,
        height : 0
    }
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
      }
    
    componentDidMount() {
        let article_id = this.props.match.params.id

        this.setState({index:article_id})
    }
    findID() {
        for(let i = 0; i < data.articles.length; i++){
            if(data.articles[i].id === this.state.id){
                return data.articles[i]
            }
        }
    }
    render(){
        const articleObject = this.findID()
        return(
            <div id="outer-container">
                <Helmet>
                    <style>{'body {background-image:url(/bg.jpeg);backdrop-filter: blur(5px);-webkit-backdrop-filter:blur(5px);min-height:100%'}</style>
                </Helmet>
                <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
                <div className="title">
                <Header as='h1' icon textAlign='center' >
                    <Icon name='user circle' circular color='red'/>
                    <Header.Content id="header">{articleObject.title}</Header.Content>
                    </Header>
                </div>
            </div>
            
        )
        
    }
}

export default ShowArticle;