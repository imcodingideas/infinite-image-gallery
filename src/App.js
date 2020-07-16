import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { hot } from 'react-hot-loader/root';
import './styles.css';

export const App = hot(() => (
  <div className="app">
    <h1>Unsplash Image Gallery!</h1>

    <form>
      <input type="text" placeholder="Search Unsplash..." />
      <button type="button">Search</button>
    </form>

    <div className="image-grid">
      {[...Array(100)].map((_, index) => (
        <div className="image" key={index}>
          <img src="https://placekitten.com/g/1920/1080" alt="Sample" />
        </div>
      ))}
    </div>
  </div>
));
