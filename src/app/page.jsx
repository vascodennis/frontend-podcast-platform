import { FilterBar } from "./components/FilterBar";
import { PodcastCard } from "./components/PodcastCard";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* <FilterBar /> */}
      <Feed />
    </main>
  );
}
