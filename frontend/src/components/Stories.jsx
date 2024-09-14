import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CreateStory from "./CreateStory";

// Individual Story Icon
const StoryIcon = ({ story, onClick }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-red-500">
        <img
          src={story?.imageUrl}
          alt={story?.user?.username}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-2 text-sm text-gray-300">{(story?.user?.username.slice(0,10))}...</p>
    </div>
  );
};

// Story Viewer with Timer
const StoryViewer = ({ story, onClose, onNextStory }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!story) return;

    // Reset progress when a new story starts
    setProgress(0);

    const timerDuration = 5000; // Duration of each story in milliseconds
    const intervalDuration = 50; // Update interval in milliseconds
    const increment = (100 / timerDuration) * intervalDuration; // Progress increment based on the timer

    const timerInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress + increment >= 100) {
          clearInterval(timerInterval); // Stop the interval when progress reaches or exceeds 100
          onNextStory(); // Trigger the next story
          return 100; // Set progress to 100 exactly
        }
        return prevProgress + increment; // Increase progress
      });
    }, intervalDuration);

    // Clean up the interval when the component unmounts or the story changes
    return () => clearInterval(timerInterval);
  }, [story, onNextStory]);

  // Check if the progress reaches 100, then close the story viewer
  useEffect(() => {
    if (progress === 100) {
      onClose(); // Close the story viewer once progress is 100
    }
  }, [progress, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Story Image */}
        <img src={story?.imageUrl} alt={story?.user?.username} className="w-auto h-4/5 object-contain" />

        {/* Progress bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gray-400">
          <div
            className="bg-white h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const Stories = () => {

  const {stories} = useSelector(store=>store.story)
  console.log("Rohit", stories)
  // const stories = [
  //   {
  //     image: "https://images.unsplash.com/photo-1725615357444-6123528686cf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_one",
  //     caption: "Enjoying the beach 🏖️",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1725206725667-90a47389d0b8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_two",
  //     caption: "Morning vibes 🌅",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1725504836973-a434fa6c4753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_three",
  //     caption: "Exploring the city 🏙️",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1725504836973-a434fa6c4753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_four",
  //     caption: "Another city adventure 🏙️",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1725504836973-a434fa6c4753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_four",
  //     caption: "Another city adventure 🏙️",
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1725504836973-a434fa6c4753?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
  //     username: "user_four",
  //     caption: "Another city adventure 🏙️",
  //   },
  // ];

  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const storyContainerRef = useRef(null);

  const handleNextStory = () => {
    setSelectedStoryIndex((prevIndex) =>
      prevIndex < stories.length - 1 ? prevIndex + 1 : 0
    );
  };

  const scrollStories = (direction) => {
    if (storyContainerRef.current) {
      storyContainerRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const { user } = useSelector(store => store.auth)
  const [open, setOpen] = useState(false)

  return (
    <div className="md:px-4 px-2 pt-7 w-[355px] md:w-[500px]">
      <h1 className="text-xl font-bold mb-5 text-white hidden md:block">Stories</h1>

      {/* Scrollable Story Icons with Arrows */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button
          className="absolute left-0 z-10 bg-gray-200 p-2 rounded-full shadow-md hidden md:block"
          onClick={() => scrollStories("left")}
        >
          <ArrowLeft />
        </button>

        {/* Story Icons Scrollable Container */}
        <div
          ref={storyContainerRef}
          className="flex space-x-4 overflow-x-auto no-scrollbar px-12"
          style={{ whiteSpace: 'nowrap' }}
        >
          <div  onClick={()=>setOpen(true)}
            className="flex flex-col relative items-center cursor-pointer"

          >
            <div className="w-20 h-20 rounded-full  overflow-hidden border-4 ">
              <img
                src={user?.profilePicture}
                alt={user?.username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute text-white bg-blue-600 rounded-full bottom-8 right-3  border-2"><Plus /></div>
            <p className="mt-2 text-sm text-gray-300">Your Story</p>
          </div>

          {stories && stories.map((story, index) => (
            <StoryIcon
              key={index}
              story={story}
              onClick={() => setSelectedStoryIndex(index)}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className="absolute right-0 bottom- z-10 bg-gray-200 opacity-80 p-2 rounded-full shadow-md "
          onClick={() => scrollStories("right")}
        >
          <ArrowRight width={22} />
        </button>
      </div>

      {/* Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          story={stories[selectedStoryIndex]}
          onClose={() => setSelectedStoryIndex(null)}
          onNextStory={handleNextStory}
        />
      )}
      <CreateStory open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Stories;
