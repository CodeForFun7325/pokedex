import { Suspense } from "react";

/// Components
import SearchBar from "@/src/app/component/search/searchbar";
import GalleryContainer from "@/src/app/component/gallery/gallerycontainer";
import GlobalLoading from "@/src/app/component/loading/loading";

// CSS Styling
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
