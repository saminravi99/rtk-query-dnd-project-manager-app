import React from "react";
import TeamOptions from "./TeamOptions";

const Team = ({team}) => {
    const {teamName, teamTitle, createdAt, teamColor, id} = team || {};

    const colorClasses =[
      {
        color: "text-blue-500",
        bgColor: "bg-blue-100",
      },
      {
        color: "text-red-500",
        bgColor: "bg-red-100",
      },
      {
        color: "text-green-500",
        bgColor: "bg-green-100",
      },
      {
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
      },
      {
        color: "text-orange-500",
        bgColor: "bg-orange-100",
      },
      {
        color: "text-purple-500",
        bgColor: "bg-purple-100",
      },
      {
        color: "text-pink-500",
        bgColor: "bg-pink-100",
      },
      {
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
      },
    ];

    const color = colorClasses.find((c) => c.color.includes(teamColor));

    
  return (
    <>
      <div
        className="relative flex flex-col items-start p-4 mt-3   bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        <span className="absolute top-0 right-0 ">
          <TeamOptions teamId={id} />
        </span>
        <span
        
          className={`flex items-center h-6 px-3 text-xs font-semibold ${color?.color} ${color?.bgColor}  rounded-full`}
        >
          {teamName}
        </span>
        <h4 className="mt-3 text-sm font-medium">{teamTitle}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">{createdAt}</span>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Team;
