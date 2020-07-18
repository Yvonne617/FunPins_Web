import { Tab } from 'semantic-ui-react'
import PinPreview from './PinPreview'
import React, { Component } from 'react';
class TabExampleSecondary extends Component {

render() {
    return (
        <Tab menu={{ secondary: true, attached: true,
            tabular: true,
            style: {
              display: "flex",
              justifyContent: "center"
            } }} panes={[
                {
                  menuItem: '我的标记',
                  render: () => 
                  <Tab.Pane attached={false}>
                      <PinPreview pinIds={this.props.pinIds}/>
                  </Tab.Pane>,
                },
                {
                  menuItem: '我的想去',
                  render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
                }
              ]
              }  />

    )
    
}
}

export default TabExampleSecondary