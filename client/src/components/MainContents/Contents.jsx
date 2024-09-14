import React, { Suspense } from "react";
import HeroSection from "../HeroSection/HeroSection";
const ForYouSection = React.lazy(() => import("../HeroSection/ForYouSection"));
import Navbar from "../Navbar/Navbar";
import C_footer from "../C.fotter";
import Footer from "../Footer";
import ListCarousal from "../carousal/ListCarousal";
import Chats from "../Chats/AllChatsComo/Chats";

const Contents = () => {
  return (
    <div className="flex flex-col items-center h-full w-full max-w-7xl bg-dark-secondary mx-auto overflow-y-auto">
      <Navbar />
      <HeroSection />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-48">
            <p className="text-dark-accent text-xl">Loading...</p>
          </div>
        }
      >
        <ForYouSection />
      </Suspense>
      <div className="w-full px-4 max-w-4xl mb-8">
        <ListCarousal />
      </div>
      <C_footer />
      <Footer />
    </div>
  );
};

export default Contents;
