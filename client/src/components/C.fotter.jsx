import React from "react";

const C_footer = () => {
  return (
    <div className="space-y-4 my-6  max-w-[480px] w-full flex flex-col items-center">
      <h1 className="text-2xl font-medium text-white">Create a Character</h1>
      <p className="text-gray-400 text-center text-md">
        Not vibing with any Characters? Create one of your own! Customize things
        like their voice, conversation starts, their tone, and more!
      </p>
      <button
        className="z-0 text-white text-lg p-2 rounded-full my-10 relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden outline-none hover:bg-primary/90 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 transition-transform-colors-opacity motion-reduce:transition-none bg-primary"
        role="button"
        tabIndex="0"
        href="/character/new"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height="16px"
          width="16px"
          aria-hidden="true"
          focusable="false"
          tabIndex="-1"
        >
          <path
            d="M16 8a1 1 0 1 0-2 0c0 2.309-.51 3.742-1.384 4.616S10.309 14 8 14a1 1 0 1 0 0 2c2.309 0 3.742.51 4.616 1.384S14 19.691 14 22a1 1 0 1 0 2 0c0-2.309.51-3.742 1.384-4.616S19.691 16 22 16a1 1 0 1 0 0-2c-2.309 0-3.742-.51-4.616-1.384S16 10.309 16 8Z"
            fill="currentColor"
          ></path>
          <path
            d="M16 8a1 1 0 1 0-2 0c0 2.309-.51 3.742-1.384 4.616S10.309 14 8 14a1 1 0 1 0 0 2c2.309 0 3.742.51 4.616 1.384S14 19.691 14 22a1 1 0 1 0 2 0c0-2.309.51-3.742 1.384-4.616S19.691 16 22 16a1 1 0 1 0 0-2c-2.309 0-3.742-.51-4.616-1.384S16 10.309 16 8Z"
            fill="currentColor"
          ></path>
          <path
            d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-4-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-2 7a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H6Zm1 3a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM18 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm1 3a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Z"
            fill="currentColor"
          ></path>
        </svg>
        <span className="text-md font-semibold mx-3">Create character</span>
      </button>
    </div>
  );
};

export default C_footer;
