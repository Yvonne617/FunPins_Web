import React, { Component } from 'react';
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image } from 'semantic-ui-react';
export default class MenuExampleSecondary extends Component {
    state = { width: 0, height: 0 };
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
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
                        news
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}