import React from "react";

const Birthdayform = ({ onNext }) => {
  const genders = [
    {
      id: 1,
      name: "Male",
    },
    {
      id: 2,
      name: "Female",
    },
    {
      id: 3,
      name: "Other",
    },
  ];

  return (
    <>
      {" "}
      <div className=" bg-dark-secondary p-6 w-full max-w-md rounded-3xl shadow-lg">
        <h1 className="font-bold text-white">Choose you're gender</h1>
        <div className="form-control">
          {genders.map((gender) => (
            <form action="">
              <label key={gender.id} className="label cursor-pointer">
                <span className="label-text text-white ml-2">
                  {gender.name}
                </span>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </form>
          ))}
          <button className="btn btn-primary" onClick={onNext}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Birthdayform;
