import React from "react";
import CharacterInputs from "./CharacterInputs";

const AllCompo = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-dark-secondary  text-white overflow-auto">
        <div className="flex flex-col items-center">
          <CharacterInputs />
        </div>
      </div>
    </>
  );
};

export default AllCompo;
