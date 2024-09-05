import axios from "axios";
import React, { useState } from "react";

const CharacterInputs = () => {
  const [characterData, setCharacterData] = useState({
    name: "",
    description: "",
    personality: "",
    greetings: "",
    tagline: "",
    avatar: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCharacterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCharacterData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setPreview(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in characterData) {
      formData.append(key, characterData[key]);
    }
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/v1/character/new`,
        formData,
        config
      );
      console.log("Character created:", response.data);
    } catch (error) {
      console.error("Error creating character:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-primary  text-white p-8 rounded-lg shadow-lg w-full max-w-xl"
      >
        <div className="relative flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <svg
                  className="w-6 h-6 text-white absolute"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l3.536-3.536m-2.464 7.07A5.978 5.978 0 0112 21a6 6 0 110-12 6 6 0 012.357.482m3.095 1.89l3.536-3.536M10 14l7-7"
                  />
                </svg>
              )}
            </div>
          </label>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Character name
          </label>
          <input
            type="text"
            name="name"
            value={characterData.name}
            onChange={handleChange}
            placeholder="e.g. Albert Einstein"
            maxLength={20}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Personality</label>
          <textarea
            name="personality"
            value={characterData.personality}
            onChange={handleChange}
            placeholder="Add character personality"
            maxLength={400}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-24 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={characterData.tagline}
            onChange={handleChange}
            placeholder="Add a short tagline of your Character"
            maxLength={50}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={characterData.description}
            onChange={handleChange}
            placeholder="How would your Character describe themselves?"
            maxLength={500}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-28 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Greeting</label>
          <textarea
            name="greetings"
            value={characterData.greetings}
            onChange={handleChange}
            placeholder="A greeting phrase your character would use"
            maxLength={100}
            className="p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-20 resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg w-full mt-2 transition duration-300"
        >
          Create Character
        </button>
      </form>
    </div>
  );
};

export default CharacterInputs;
