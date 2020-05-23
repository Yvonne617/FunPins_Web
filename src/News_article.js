import React, { Component } from 'react';
import {List} from 'semantic-ui-react'
import './style/News_article.css'
class News_article extends Component {
  render() {
    const article = this.props.article;
    
    return ( 
        <List.Item>        
        <div className="media-content">
        <div className="content">
          <h3 id="Newstitle">
            <a className= "title" href={article.url} target="_blank">
              <strong>{article.title}</strong>
            </a>
            <small><i> by {article.author}</i></small>
            <br/>
            <small><em> {article.date}</em></small>
            <hr/>
          </h3>
        </div>
      </div>
      </List.Item>   
      
    );
  }
}

export default News_article;
