import { Suspense } from "react";
import SearchBar from "./component/search/searchbar";
import GalleryContainer from "./component/gallery/gallerycontainer";
import "./page.module.css";

export default function Home() {
  return (
    <>
      <h1>PokeDex</h1> 
      <SearchBar />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <GalleryContainer />
      </Suspense>
    </>
  );
}
