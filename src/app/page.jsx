import { FilterBar } from "./components/FilterBar";
import { PodcastCard } from "./components/PodcastCard";
import Feed from "./components/Feed";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <FilterBar />
      <section className="grid grid-cols-4 gap-2 gap-y-24 mt-32">
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
        <PodcastCard />
      </section>
      <Feed />
    </main>
  );
}
