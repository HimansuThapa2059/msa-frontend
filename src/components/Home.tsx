import { MoveRight, LogOut, Menu, Sparkles } from "lucide-react";
import { buttonVariants } from "./ui/button";

import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <div className="background-pattern absolute top-0 left-0 w-full h-full -z-10" /> */}
    </>
  );
};

const Hero = () => {
  return (
    <main className="max-container pb-12 pt-20 md:pt-28 flex flex-col items-center justify-center text-center sm:pt-40 ">
      <div className="mx-auto mb-3 flex max-w-fit cursor-pointer items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 px-6 py-1.5 shadow-md backdrop-blur transition-all hover:border-gray-300 ">
        <div className="flex items-center justify-between gap-1 text-sm font-semibold text-gray-700">
          <Sparkles className="h-4 w-4" />
          <span>MSAs is now available!</span>
        </div>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl md:leading-[1.05] lg:leading-[1.05]">
        Manage Your Watchlist, Track Your Favorites
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        <span className="text-indigo-600">MSAs</span> lets you view your
        watched/watchlist movies, series, and animes with ratings and
        descriptions, and save content to remember forever.
      </p>
      <Link
        className={buttonVariants({
          size: "lg",
          className: "mt-5 bg-indigo-950",
        })}
        to="/login"
        // target="_blank"
      >
        Get started <MoveRight className="ml-1 h-5 w-5" />
      </Link>
    </main>
  );
};

export default Home;

const Navbar = () => {
  const isAuthenticated = true;

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-16 w-full border-b border-zinc-200 bg-white/75 backdrop-blur-lg transition-all px-6">
      <div className="max-container">
        <div className="flex h-16 items-center justify-between ">
          <Link to="/" className="z-40">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
          </Link>

          <button className="inline-block sm:hidden">
            <Menu className="w-9 h-9" />
          </button>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              {!isAuthenticated && (
                <Link
                  to={"/signin"}
                  className={buttonVariants({
                    variant: "ghost",
                    className: "hover:bg-zinc-200",
                  })}
                >
                  Sign In
                </Link>
              )}

              {!isAuthenticated && (
                <Link
                  className={buttonVariants({
                    size: "default",
                    className: " bg-indigo-950",
                  })}
                  to="/msa"
                  // target="_blank"
                >
                  Get started
                </Link>
              )}

              {isAuthenticated && (
                <button
                  className={buttonVariants({
                    variant: "outline",
                  })}
                >
                  Log out
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </>
          </div>
        </div>
      </div>
    </nav>
  );
};
