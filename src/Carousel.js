import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
 
class DemoCarousel extends Component {
    render() {
        var images = Array.from(this.props.images);
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
    }
}
 
export default  DemoCarousel;