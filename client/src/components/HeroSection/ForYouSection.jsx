import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const ForYouSection = () => {
  const characters = [
    {
      name: "Raiden Ei",
      game: "Genshin Impact",
      image: "/assets/raiden.jpg",
      description: "Inazuma shines eternal",
      author: "@aether",
      likes: "468.2m",
    },
    {
      name: "Sukuna",
      game: "Jujutsu Kaisen",
      image: "/assets/kuna.jpg",
      description: "The strongest. I'm the winner at everything.",
      author: "@serafinyaa",
      likes: "468.2m",
    },
    {
      name: "Andrew Tate",
      game: "Real World",
      image: "/assets/tate.webp",
      description: "Breath air!",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      name: "Zero Two",
      game: "Darling in the Franxx",
      image: "/assets/zero.jpeg",
      description: "Darling",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      name: "Killua",
      game: "Hunter X Hunter",
      image: "/assets/kill.jpeg",
      description: "Gooooooon!",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    {
      name: "Elon Musk",
      game: "From Mars",
      image: "/assets/elon.jpg",
      description: "Baldie",
      author: "@Kass_h1a",
      likes: "56.3m",
    },
    // Add more characters as needed
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <div className="relative mt-10 rounded-2xl bg-dark-primary w-full max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-dark-accent mb-4">For You</h2>
      <div className="flex items-center w-full relative">
        <button
          onClick={scrollLeft}
          className="absolute rounded-3xl left-0 z-10 h-full bg-gradient-to-r from-dark-secondary to-transparent w-20 flex items-center justify-center"
        >
          <FaArrowLeft className="text-white text-2xl" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-4 pb-4 mx-12 scrollbar-hide"
        >
          {characters.map((character, index) => (
            <div
              key={index}
              className="min-w-[200px] max-w-[200px] bg-dark-primary hover:bg-dark-secondary rounded-xl p-4 flex-shrink-0"
            >
              <div className="overflow-hidden mb-3">
                <img
                  src={character.image}
                  className="w-full h-48 rounded-lg object-cover"
                  alt={`${character.name} from ${character.game}`}
                />
              </div>
              <h3 className="text-lg font-bold text-dark-accent">
                {character.name}
              </h3>
              <p className="text-sm text-gray-400">{character.description}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                <span>{character.author}</span>
                <span>{character.likes}</span>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute rounded-3xl right-10 z-10 h-full bg-gradient-to-l from-dark-secondary to-transparent w-20 flex items-center justify-center"
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ForYouSection;
