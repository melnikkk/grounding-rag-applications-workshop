import Image from "next/image";
import TmdbLogo from "../../public/tmdb-logo.svg";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Popular from "./components/Popular";
import Recent from "./components/Recent";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Nav showSearch={true} fixed={true}/>
      <Header/>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="recommendations">
                <Popular />
                <Recent />
            </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      Credits: This product uses the TMDB API but is not endorsed or certified by TMDB.
      <div className="footer-logo">
        <Image
          className="nav__logo"
          src={TmdbLogo}
          alt=""
        />
      </div>
        Adapted by Carly Richmond with love and excessive amounts of 🍵
      </footer>
    </div>
  );
}
