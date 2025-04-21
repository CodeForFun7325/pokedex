import styles from "./page.module.css";
import SearchBar from "./component/search/searchbar";
import Gallery from "./component/gallery/gallery";

export default function Home() {
  return (
    <>
      <h1>PokeDex</h1>
      <SearchBar />
      <Gallery /> 
    </>
  );
}
