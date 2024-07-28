import React from "react";

const ShadowBar = ({ position }) => {
  const isLeft = position === "left";
  return (
    <div
      className={`absolute top-0 ${
        isLeft ? "left-0" : "right-0"
      } h-full w-8 pointer-events-none`}
    >
      <div
        className={`h-full ${
          isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
        } from-dark-secondary to-transparent`}
      ></div>
    </div>
  );
};

export default ShadowBar;
