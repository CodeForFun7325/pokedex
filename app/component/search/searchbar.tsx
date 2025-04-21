import "./searchbar.css";

function SearchBar() {
  return (
    <div className="search-bar-container"> 
      <div className="search-bar">
        <input className="search-bar" type="text" placeholder="Search Pokémon..." />
      </div>
    </div>
  );
}

export default SearchBar;