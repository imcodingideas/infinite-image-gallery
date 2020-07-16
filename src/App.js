import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import './styles.css';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

export const App = hot(() => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`https://api.unsplash.com/photos?client_id=${accessKey}`)
      .then(res => res.json())
      .then(setImages);
  }, []);

  // return error if no accessKey
  if (!accessKey) {
    return (
      <a href="https://unsplash.com/documentation" className="error">
        Required: Get your Unsplash API key first.
      </a>
    );
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button type="button">Search</button>
      </form>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img src={image.urls.regular} alt={image.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
});
