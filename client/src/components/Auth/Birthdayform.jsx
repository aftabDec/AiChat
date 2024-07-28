import React, { useState } from "react";

const Birthdayform = ({ onNext }) => {
  const genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
  ];

  const [selectedGender, setSelectedGender] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGender) {
      try {
        onNext({ gender: selectedGender });
      } catch (error) {
        console.error("Error in onNext: gender", error);
      }
    } else {
      alert("Please select a gender");
    }
  };

  return (
    <div className="bg-dark-secondary p-6 w-full max-w-md rounded-3xl shadow-lg">
      <h1 className="font-bold text-white">Choose your gender</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          {genders.map((gender) => (
            <label key={gender.id} className="label cursor-pointer">
              <span className="label-text text-white ml-2">{gender.name}</span>
              <input
                type="radio"
                name="gender"
                value={gender.name}
                checked={selectedGender === gender.name}
                onChange={() => setSelectedGender(gender.name)}
                className="radio radio-primary"
              />
            </label>
          ))}
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Birthdayform;
