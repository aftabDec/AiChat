import React from "react";

const UserProfile = () => {
  return (
    <>
      {" "}
      <div className="flex mt-[35rem] mb-10 flex-col items-center justify-center space-y-3 w-full h-full  text-white">
        {/*user profile*/}
        <div className="flex flex-col justify-center items-center space-y-1">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src="/assets/raiden.jpg"
            alt="Raiden"
          />
          <p className="text-lg font-semibold">Makima</p>
        </div>
        {/*state for following and followrs*/}
        <div className="flex items-center justify-center space-x-7">
          <div className="text-center">
            <button className="text-lg font-medium">
              <span className="block">1000</span>
              <span className="text-sm text-gray-400">followers</span>
            </button>
          </div>
          <div className="text-center">
            <button className="text-lg font-medium">
              <span className="block">18m</span>
              <span className="text-sm text-gray-400">chats</span>
            </button>
          </div>
          <div className="flex items-center space-x-1 text-lg font-medium">
            <span>
              <span className="block">108</span>
              <span className="text-sm text-gray-400">following</span>
            </span>
          </div>
        </div>
        {/*follow button*/}
        <button className="p-2 px-5 transition-all hover:bg-gray-200 hover:text-gray-700 ease-in rounded-full bg-white text-black">
          follow
        </button>
      </div>
    </>
  );
};

export default UserProfile;
