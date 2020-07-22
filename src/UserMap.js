import React, { Component } from 'react';
import {Helmet} from 'react-helmet';
import StickyHeader from 'react-sticky-header';
import { Grid, Image } from 'semantic-ui-react';
import Earth from './Earth3D';
class UserMap extends Component {
    constructor (props){
        super(props);
        this.state = { width: 0, height: 0 ,data:{},user:{},userinfo:{}};
      }    
    updateDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      };
      
    componentDidMount() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', this.updateDimensions);
      }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
        
      }

    render() {
        return (
            <div style={{height:'100vh',background: 'black'}}>
                <Helmet>
                    <title>我的地图</title>
                </Helmet>
                <StickyHeader
                    // This is the sticky part of the header.
                    header={
                    <div className="Header_root">
                        <div className="Header_title">
                            <div id="funpinsheader">
                                <img id="dqlogo" src="/dianquanLogo.png"></img>
                                <div id="dq" className="pintitle">点圈,</div>
                                <div id="dt" className="pinsubtitle">用地图标记生活</div>
                            </div>
                            <div id="openappbtn" onClick={this.createDynamicLink}>
                                <div id="openapp" >打开App</div>
                            </div>
                           
                        </div>
                        
                    </div>
                    }
                >
                    
                </StickyHeader>
                <Earth />
            </div>
        )
    }
}
export default UserMap;