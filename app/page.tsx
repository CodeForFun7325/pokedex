import { Suspense } from "react";
import SearchBar from "./component/search/searchbar";
import Gallery from "./component/gallery/gallery";
import "./page.module.css";

export default function Home() {
  return (
    <>
      <h1>PokeDex</h1> 
      <SearchBar />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Gallery />
      </Suspense>
    </>
  );
}
