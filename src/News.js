import React, { Component } from 'react';
import Menu from './topmenu';
import "semantic-ui-css/semantic.min.css";
import { Grid, Image, List, Divider } from 'semantic-ui-react';
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
                    
                        <List divided bulleted>
                        <List.Item>
                        <List.Content>
                            <a href='https://github.com/fly51fly/Practical_Python_Programming'>Test link_1</a>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                        </List.Content>
                        </List.Item>
                        
                        </List>
                    
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                </main>          
         </div>
        )
    }
}