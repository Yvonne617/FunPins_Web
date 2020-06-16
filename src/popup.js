import React, { Component } from 'react';
import { Grid, Image, List, Divider } from 'semantic-ui-react';
export default class Popup extends Component{
    render() {
        return (
            <div id="outer-container">
            <main id="page-wrap">
            <Grid centered>
            <Grid.Row id="row1" >
                <Grid.Column mobile={16} tablet={16} computer={10}>
                <div>
                <List selection bulleted>
                    article.
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