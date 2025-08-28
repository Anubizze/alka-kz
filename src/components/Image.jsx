import React from 'react';
import getImagePath from '../utils/imagePaths';

const Image = ({ src, alt, className, ...props }) => {
  const correctedSrc = getImagePath(src);
  
  return (
    <img 
      src={correctedSrc} 
      alt={alt} 
      className={className}
      {...props}
    />
  );
};

export default Image;
