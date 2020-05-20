import React, { Component } from 'react';
import Menu from './topmenu';
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
    componentWillReceiveProps(nextProps){
        this.setState({articles: data.articles})
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
    renderArticles() {
        
        return this.state.articles.map((article, index) => {
            return (
                <News_article key={index} article={article} />
            )
        });
    }

    render() {
        const articles = this.renderArticles();
        return (
            <div id="outer-container">
                <Menu windowwidth={this.state.width?this.state.width:window.innerWidth}/>  
                <main id="page-wrap">
                <Grid centered>
                <Grid.Row id="row1" >
                    <Grid.Column mobile={16} tablet={16} computer={8}>
                    <List divided selection>
                        {articles}
                    </List>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}
