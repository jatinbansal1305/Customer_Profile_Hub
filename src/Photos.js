import React, { useState, useEffect } from 'react';
import './Photos.css';

const Photos = () => {
  const [imageUrls, setImageUrls] = useState([]); 
  const baseUrl = 'https://robohash.org/';
  const maxImages = 9;
  const interval = 10000;

  useEffect(() => {
   
    const initialUrls = Array.from({ length: maxImages }, (_, index) => `${baseUrl}${index}`);
    setImageUrls(initialUrls);

    const timer = setInterval(() => {
     
      const newUrls = Array.from({ length: maxImages }, () => {
        const randomNumber = Math.floor(Math.random() * 1000);
        return `${baseUrl}${randomNumber}`;
      });

      setImageUrls(newUrls);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []); 

  return (
    <div className='photo-grid'>
      {imageUrls.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Random Robot ${index}`} className='photo' />
      ))}
    </div>
  );
};

export default Photos;
