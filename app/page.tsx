import { Suspense } from "react";
import SearchBar from "./component/search/searchbar";
import GalleryContainer from "./component/gallery/gallerycontainer";
import "./page.module.css";


export default function Home({ searchParams }: { searchParams : { [key: string]: string | ""}}) {
  const searchQuery = searchParams.search || "";

  return (
    <>
      <h1>PokeDex</h1>
      <SearchBar />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <GalleryContainer search={searchQuery} />
      </Suspense>
    </>
  );
}
