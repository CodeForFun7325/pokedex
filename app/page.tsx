import styles from "./page.module.css";
import SearchBar from "./component/search/searchbar";
import Gallery from "./component/gallery/gallery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <>
      <h1>PokeDex</h1>
      <SearchBar />
      <QueryClientProvider client={queryClient}>
        <Gallery /> 
      </QueryClientProvider>
    </>
  );
}
