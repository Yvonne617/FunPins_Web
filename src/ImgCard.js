import React, { Component } from 'react'
import { Button, Dimmer, Header, Image } from 'semantic-ui-react'
import './style/App.css';

export default class ImgCard extends Component {
  state = {}

  handleShow = () => this.setState({ active: true })
  handleHide = () => this.setState({ active: false })

  render() {
    const { active } = this.state
    const content = (
      <div>
        <Header as='h2' inverted>
          {this.props.title}
        </Header>
        <Button primary>Add</Button>
        <Button>View</Button>
      </div>
    )

    return (
      <Dimmer.Dimmable
        as={Image}
        dimmed={active}
        dimmer={{ active, content }}
        onMouseEnter={this.handleShow}
        onMouseLeave={this.handleHide}
        size='medium'
        src= {this.props.url}
      />
    )
  }
}