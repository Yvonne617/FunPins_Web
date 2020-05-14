import React, { Component } from 'react'
import Imgcard from './ImgCard';
import { Grid, Image } from 'semantic-ui-react'
export default class Subcontainer extends React.Component {
    render() {
      return (
        <Grid relaxed columns={3} style={{textAlignVertical: "center",textAlign: "center",width:"100%"}}>
          <Grid.Column>
          <Imgcard title="Friends" url="/friends.jpg" />
          </Grid.Column>
          <Grid.Column>
          <Imgcard title="Map" url="/map.png" />
          </Grid.Column>
          <Grid.Column>
          <Imgcard title="Restaurant" url="/restaurant.jpg" />
          </Grid.Column>
        </Grid>

      )
    }
  }