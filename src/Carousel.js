import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; 
import {Helmet} from 'react-helmet';
import axios from 'axios';

class DemoCarousel extends Component {
    constructor (props){
        super(props);
        this.state = {video: null,images:null};
      } 

    loadData() {
            this.setState({
                video: this.props.video,
                images:this.props.images
            });
    }

      
    componentDidMount() {
        this.loadData();
        // console.log(this.props.isvideo)
        // if(this.props.isvideo){
        //     console.log(this.props.video)
        //     getVideo(this.props.video)
        // }
      }
    render() {
        if (this.state.video !== null) {
            return <div />
        }
        var images = Array.from(this.props.images);
        if(!this.props.video){
            var imglist = images.map(function(img){
                return(
                    <div className="imgcontainer">
                        <img src={img}></img>
                    </div>
                );
            })
            return (
                <Carousel showIndicators={this.props.showIndicators} showArrows={true} showStatus={true} width="100%" emulateTouch={true} showThumbs={false}  useKeyboardArrows={true}>
                    {imglist}
                </Carousel>
            );
        }else{
            return(
                <Player height={300} width="100%" src={this.props.video} poster={images[0]} fluid={false}/>
                // <VideoPlayer url={this.props.video} poster="/test.jpeg" aspectRatio="4:3" width={400} height={300}/>
            )
        }

    }
}
 
// const getVideo = (url) =>{
//     axios.get("http://www.baidu.com",{ crossdomain: true }).then(res => {
//     }).catch(error => {
//     });
// }
export default  DemoCarousel;