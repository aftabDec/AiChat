import React from "react";
import { IoChatbubbleOutline, IoThumbsUp } from "react-icons/io5";

const UserCharList = () => {
  const characters = [
    {
      id: 1,
      chats: 34,
      name: "Raiden Ei",
      game: "Genshin Impact",
      image: "/assets/raiden.jpg",
      description: "Inazuma shines eternal",
      author: "@aether",
      likes: "468.2m",
    },
    {
      id: 2,
      chats: 75,
      name: "Sukuna",
      game: "Jujutsu Kaisen",
      image: "/assets/kuna.jpg",
      description: "The strongest. I'm the winner at everything.",
      author: "@serafinyaa",
      likes: "468.2m",
    },
    {
      id: 3,
      chats: 45,
      name: "Andrew Tate",
      game: "Real World",
      image: "/assets/tate.webp",
      description: "Breath air!",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      id: 4,
      chats: 73,
      name: "Zero Two",
      game: "Darling in the Franxx",
      image: "/assets/zero.jpeg",
      description: "Darling",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      id: 5,
      chats: 23,
      name: "Killua",
      game: "Hunter X Hunter",
      image: "/assets/kill.jpeg",
      description: "Gooooooon!",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      id: 6,
      chats: 47,
      name: "Elon Musk",
      game: "From Mars",
      image: "/assets/elon.jpg",
      description: "Baldie",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    // Add more characters as needed
  ];

  return (
    <>
      {characters.map((character) => (
        <div
          key={character.id}
          className="flex my-2  hover:bg-zinc-800 items-center justify-between p-3 text-white rounded-3xl shadow-lg max-w-lg mx-auto w-full"
        >
          <img
            src={character.image}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover"
            alt="Character"
          />
          <div className="flex flex-col flex-grow mx-4">
            <p className="text-lg md:text-xl font-bold">{character.name}</p>
            <p className="text-gray-400 text-sm md:text-base">
              {character.description}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <button className="flex hover:bg-zinc-700 ease-in transition-all rounded-full p-2 items-center space-x-1 text-sm md:text-base">
              <IoChatbubbleOutline className="text-2xl md:text-3xl" />
              <p className="text-[15px]">{character.chats}</p>
            </button>
            <button className="flex items-center ease-in transition-all hover:bg-zinc-700 rounded-full p-2 space-x-1 text-sm md:text-base">
              <IoThumbsUp className="text-2xl md:text-3xl" />
              <p className="text-[15px]">{character.likes}</p>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCharList;
