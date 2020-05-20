import React, { Component } from 'react';
import {List} from 'semantic-ui-react'
class News_article extends Component {
  render() {
    const article = this.props.article;
    
    return (

            
            <p>
              <a href={article.url} target="_blank"> 
                <strong> {article.content} </strong>
                </a>
            </p>
      
    );
  }
}

export default News_article;
