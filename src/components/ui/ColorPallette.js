import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorSelected } from "../../features/teams/teamsSlice";

const ColorPallette = () => {
  const { color } = useSelector((state) => state.teams);
  const dispatch = useDispatch();
  const handleColorChange = (e) => {
    dispatch(colorSelected(e.target.value));
  };

  const colorClasses = [
    {
      color: "text-blue-500",
      bgColor: "bg-blue-500",
    },
    {
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    {
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    {
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      color: "text-orange-500",
      bgColor: "bg-orange-500",
    },
    {
      color: "text-purple-500",
      bgColor: "bg-purple-500",
    },
    {
      color: "text-pink-500",
      bgColor: "bg-pink-500",
    },
    {
      color: "text-indigo-500",
      bgColor: "bg-indigo-500",
    },
  ];

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "indigo",
  ];

  return (
    <>
      {colorClasses?.map((c) => {
        return (
          <input
            key={colors.find((color) => c.color.includes(color))}
            type="button"
            value={colors.find((color) => c.color.includes(color))}
            onClick={handleColorChange}
            className={`inline-block ${
              color === colors.find((color) => c.color.includes(color))
                ? `ring-2 ring-black`
                : null
            } cursor-pointer w-6 h-6 mx-2 rounded-full ${c.bgColor} ${
              c.color
            } ring-2`}
          ></input>
        );
      })}
    </>
  );
};

export default ColorPallette;
