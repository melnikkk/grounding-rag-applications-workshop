import Header from "./components/Header";
import Popular from "./components/Popular";
import Recent from "./components/Recent";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="recommendations">
                <Popular />
                <Recent />
            </div>
      </main>
    </div>
  );
}
