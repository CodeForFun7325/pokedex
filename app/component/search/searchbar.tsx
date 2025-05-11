"use client"; 

// Import hooks
import { useRouter } from "next/navigation";

// Import styling
import "./searchbar.css";

function SearchBar() {
  const router = useRouter(); 

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const search = e.target.value; 
    router.push(`?search=${encodeURIComponent(search)}`, { scroll: false });
  }

  return (
    <div className="search-bar-container"> 
      <div className="search-bar">
        <input className="search-bar" 
          type="text" 
          onChange={handleSearchOnChange} 
          placeholder="Search Pokémon..." />
      </div>
    </div>
  );
}

export default SearchBar;