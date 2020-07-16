import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { hot } from 'react-hot-loader/root';
import './styles.css';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

export const App = hot(() => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  function getPhotos() {
    fetch(`https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setImages(currentImages => [...currentImages, ...data]);
      });
  }

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

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

      <InfiniteScroll
        dataLength={images.length} // This is important field to render the next data
        next={() => setPage(page => page + 1)}
        hasMore
        loader={<h4>Loading...</h4>}
      >
        <div className="image-grid">
          {images.map((image, index) => (
            <a
              className="image"
              key={index}
              href={image.links.html}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={image.urls.regular} alt={image.alt_description} />
            </a>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
});
