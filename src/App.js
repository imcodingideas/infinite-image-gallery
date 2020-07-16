import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { hot } from 'react-hot-loader/root';
import './styles.css';

const accessKey = process.env.UNSPLASH_ACCESS_KEY;

export const App = hot(() => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const getPhotos = useCallback(() => {
    let apiUrl = `https://api.unsplash.com/photos?`;

    if (query) {
      apiUrl = `https://api.unsplash.com/search/photos?query=${query}`;
    }

    apiUrl += `&page=${page}`;
    apiUrl += `&client_id=${accessKey}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const imagesFromApi = data.results ?? data;

        if (page === 1) return setImages(imagesFromApi);

        setImages(currentImages => [...currentImages, ...imagesFromApi]);
      });
  }, [page, query]);

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  useEffect(() => {
    getPhotos();
  }, [getPhotos, page]);

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

      <form
        values={query}
        onSubmit={searchPhotos}
        onChange={e => setQuery(e.target.value)}
      >
        <input type="text" placeholder="Search Unsplash..." />
        <button type="button">Search</button>
      </form>

      <InfiniteScroll
        dataLength={images.length}
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
