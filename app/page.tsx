import { Suspense } from "react";
import SearchBar from "./component/search/searchbar";
import GalleryContainer from "./component/gallery/gallerycontainer";
import Loading from "@/app/component/loading/loading";

import "./page.module.css";


export default async function Home({ searchParams }: { searchParams : { [key: string]: string | ""}}) {

  const searchObject = await searchParams; 
  
  const searchQuery = searchObject?.search || "";
  
  return (
    <>
      <h1>PokeDex</h1>
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <GalleryContainer search={searchQuery} />
      </Suspense>
    </>
  );
}
