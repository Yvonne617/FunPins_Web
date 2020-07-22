import { Tab } from 'semantic-ui-react'
import PinPreview from './PinPreview'
import firebase from './firebase';
import React, { Component } from 'react';
// class TabExampleSecondary extends Component {

// render() {
//     return (
//         <Tab menu={{ secondary: true, attached: true,
//             tabular: true,
//             style: {
//               display: "flex",
//               justifyContent: "center"
//             } }} panes={[
//                 {
//                   menuItem: '我的标记',
//                   render: () => 
//                   <Tab.Pane attached={false}>
//                       <PinPreview pinIds={this.props.pinIds}/>
//                   </Tab.Pane>,
//                 },
//                 {
//                   menuItem: '我的想去',
//                   render: () => 
                  
//                   <Tab.Pane attached={false}>  
//                        <span></span>
//                         <PinPreview pinIds={this.props.wantToGoIds}/>
//                   </Tab.Pane>
                  
//                 }
//               ]
//               } renderActiveOnly={false} />

//     )
    
// }
// }

const panes = (props) => [
  {
    menuItem: '我的标记',
    attached: true,
    tabular: true,
    style: {
      display: "flex",
      justifyContent: "center"
    },
    pane: (
        <Tab.Pane key='tab1'>
            <PinPreview pinIds={props.pinIds}/>
        </Tab.Pane>
    )
      
  },
  {
    menuItem: '我的想去',
    attached: true,
    tabular: true,
    style: {
      display: "flex",
      justifyContent: "center"
    },
    pane: (
          <Tab.Pane key='tab2'>  
          <PinPreview pinIds={props.wantToGoIds}/>
         </Tab.Pane>
    )
      
  }
]


const TabExampleContentShorthand = (props) => (
  <Tab panes={panes(props)} renderActiveOnly={false} />
)
export default TabExampleContentShorthand
