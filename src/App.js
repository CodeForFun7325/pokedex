import React from 'react'; 
import './App.css';

import SearchBar from './component/search/searchbar';
import Gallery from './component/card/gallery';

function App() {
  return (
    <div className="App">
      <h1>PokéDex</h1>
      <SearchBar />
      <Gallery />
    </div>
  );
}

export default App;
