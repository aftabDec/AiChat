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
    <div className="relative ">
      {showLeftShadow && <ShadowBar position="left" />}
      {showRightShadow && <ShadowBar position="right" />}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex items-center overflow-x-auto  rounded-md p-4 w-full space-x-2"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-shrink-0 justify-center items-center"
          >
            <button className="btn rounded-2xl bg-dark-primary hover:text-white textarea-ghost hover:bg-zinc-800">
              {category}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCarousal;
