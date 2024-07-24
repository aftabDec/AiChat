import React from "react";
import { Sidebar, Navbar, HeroSection } from "./components/index";

function App() {
  return (
    <div className="flex w-auto h-screen flex-col p-4 bg-[#0d0d0d] text-white">
      {/* Sidebar */}
      <div className="">
        <Sidebar />
      </div>

      {/* Navbar */}
      <div className="col-span-1 lg:col-span-4 row-span-1">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-grow h-full overflow-hidden">
        <HeroSection />

        {/* Add other sections/components here */}
      </div>
    </div>
  );
}

export default App;
