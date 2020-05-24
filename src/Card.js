import React from 'react'
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import './style/App.css';
import ImageGallery from 'react-image-gallery';
const images = [
    {
      original: '/phone6.png' 
    },
    {
      original: '/phone5.png'
    },
    {
      original: '/phone4.png'
    },
    {
      original: '/phone3.png'
    }
  ];
   
  class MyGallery extends React.Component {
    render() {
      return <ImageGallery items={images} showThumbnails={false}/>;
    }
  }
export default MyGallery