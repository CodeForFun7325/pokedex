import { Suspense } from "react";
import SearchBar from "./component/search/searchbar";
import GalleryContainer from "./component/gallery/gallerycontainer";
import GlobalLoading from "@/app/component/loading/loading";

import "./page.module.css";

interface PageProps { 
  searchParams: Promise<object>; 
}

export default async function Home({ searchParams }: PageProps) {

  const searchObject = await searchParams; 

  let search: string = ""; 

  if (searchObject && searchObject instanceof Object
    && "search" in searchObject 
    && typeof searchObject.search === "string") { 
      search = searchObject.search; 
    }

  return (
    <>
      <h1>PokeDex</h1>
      <SearchBar />
      <Suspense fallback={<GlobalLoading />}>
        <GalleryContainer search={search} />
      </Suspense>
    </>
  );
}
