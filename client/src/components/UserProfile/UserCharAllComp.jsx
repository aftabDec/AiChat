import React from "react";
import UserProfile from "./userDetails/UserProfile";
import UserCharList from "./UserCharacterList/UserCharList";

const UserCharAllComp = () => {
  return (
    <>
      <div className="flex flex-col overflow-y-auto items-center justify-center">
        <div className=" flex flex-col mt-52">
          <UserProfile />
        </div>

        <UserCharList />
      </div>
    </>
  );
};

export default UserCharAllComp;
