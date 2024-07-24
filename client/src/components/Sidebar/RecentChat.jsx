import React from "react";

const RecentChat = () => {
  const chats = [
    { name: "raiden ei", pic: "/assets/raiden.jpg", id: 1 }, // Ensure correct image path
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 2 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 3 }, // Ensure correct image path
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 4 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 5 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 6 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 7 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 8 }, // Ensure correct image path
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 9 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 10 },
    { name: "raiden shogun", pic: "/assets/raiden.jpg", id: 11 },
  ];

  return (
    <div className="flex-1 scrollbar-thin scrollbar-thumb-custom overflow-y-auto p-4">
      {/* Map through recent chats */}
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="justify-start border-none hover:bg-slate-800 bg-dark-primary min-w-[13rem] btn mb-3"
        >
          {" "}
          {/* Wrap in a div for styling */}
          <img
            src={chat.pic} // Use chat.pic for dynamic image path
            alt={`${chat.name} profile picture`} // Descriptive alt text
            className="w-9 h-9 rounded-full mr-2 object-cover" // Add styling
          />
          <h1 className="text-md text-gray-50 font-normal">{chat.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default RecentChat;
