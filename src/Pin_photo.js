import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import { thisTypeAnnotation } from '@babel/types';

class MyGallery extends React.Component {
    render() {
        const images = [
            { url: "/phone1.png" },
            { url: "/phone2.png" },
            { url: "/test.jpeg" }
 
        ];

        return (
            <div>
                <SimpleImageSlider
                    width={'100%'}
                    height={'100%'}
                    images={images}
                />
            </div>
        );
    }
}
export default MyGallery