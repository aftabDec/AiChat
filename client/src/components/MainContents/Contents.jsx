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
    <div className="flex items-center flex-col h-full w-full max-w-7xl bg-dark-secondary mx-auto overflow-y-auto">
      <Navbar />
      <HeroSection />
      <Suspense fallback={<p>loading</p>}>
        <ForYouSection />
      </Suspense>
      <div className="w-full max-w-4xl">
        <ListCarousal />
      </div>
      <C_footer />
      <Footer />
    </div>
  );
};

export default Contents;
