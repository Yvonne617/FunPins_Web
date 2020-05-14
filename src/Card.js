import React from 'react'
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import './style/App.css';
import ImageGallery from 'react-image-gallery';
const images = [
    {
      original: '/phone1.png' 
    },
    {
      original: '/phone2.png'
    }
  ];
   
  class MyGallery extends React.Component {
    render() {
      return <ImageGallery items={images} showThumbnails={false}/>;
    }
  }
export default MyGallery