import React, { useRef, useState, useEffect } from "react";
import ShadowBar from "../ShadowBar";

const ListCarousal = () => {
  const categories = [
    "Anime",
    "Games",
    "Movies",
    "Books",
    "Comics",
    "Series",
    "Music",
    "Sports",
    "Technology",
    "Food",
  ];
  const scrollRef = useRef(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const handleScroll = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    handleScroll(); // Initial check
  }, []);

  return (
    <div className="relative">
      {showLeftShadow && <ShadowBar position="left" />}
      {showRightShadow && <ShadowBar position="right" />}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center overflow-x-auto p-4 space-x-2 scrollbar-hide"
      >
        {categories.map((category, index) => (
          <button
            key={index}
            className="btn rounded-2xl bg-dark-primary hover:text-white hover:bg-zinc-800 transition-all ease-in-out"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListCarousal;
