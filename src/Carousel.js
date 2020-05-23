import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Player } from 'video-react';
import "video-react/dist/video-react.css"; 

class DemoCarousel extends Component {
    render() {
        var images = Array.from(this.props.images);
        console.log(images[0])
        if(!this.props.isvideo){
            var imglist = images.map(function(img){
                return(
                    <div>
                        <img src={img}></img>
                    </div>
                );
            })
            return (
                <Carousel showIndicators={this.props.showIndicators} showArrows={false} showStatus={false} width="100%" showThumbs={false}  useKeyboardArrows={true}>
                    {imglist}
                </Carousel>
            );
        }else{
            return(
                <Player height={300} width="100%" src={this.props.video} poster={images[0]} fluid={false} />
       
                // <VideoPlayer url={this.props.video} poster="/test.jpeg" aspectRatio="4:3" width={400} height={300}/>
            )
        }

    }
}
 
export default  DemoCarousel;