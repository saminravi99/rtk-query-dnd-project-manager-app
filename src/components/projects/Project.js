import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { useSelector } from "react-redux";
import { useGetAllTeamsQuery} from "../../features/teams/teamsApi";
import ProjectOptions from "./ProjectOptions";
import { useDispatch } from "react-redux";
import { projectSelected } from "../../features/projects/projectsSlice";
import { useGetSearchedProjectsQuery } from "../../features/projects/projectsApi";

const Project = ({ status, project, index }) => {
  const dispatch = useDispatch();
  const { assignedTeam, projectTitle, createdAt, creatorImg, teamId, id } =
    project || {};
  const { data: teams } = useGetAllTeamsQuery();

  const colorClasses = [
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

  //find teamColor from teams array by team name
  const teamColor = teams?.find(
    (team) => team.teamName === assignedTeam
  )?.teamColor;

  const color = colorClasses.find((c) => c.color.includes(teamColor));

  const { searchedText: text } = useSelector((state) => state.projects) || {};

  const { data: searchedProjects } = useGetSearchedProjectsQuery(text, {
    skip: !text,
  });

  //highlight the searched projects

  let highlightedProject = searchedProjects?.find((p) => p.id === id);

  if (!text) {
    highlightedProject = null;
  }

  return (
    <Draggable draggableId={id?.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          onMouseDown={() => dispatch(projectSelected({ projectId: id }))}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`relative
          ${
            highlightedProject
              ? "bg-yellow-50 shadow-2xl ring-4 ring-yellow-400 animate-pulse"
              : ""
          }
           flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100
          `}
          draggable="true"
        >
          {status === "Backlog" && (
            <span className="absolute top-0 right-0">
              <ProjectOptions
                projectId={id}
                teamId={teamId}
                teamName={assignedTeam}
              />
            </span>
          )}
          <span
            className={`flex items-center h-6 px-3 text-xs font-semibold ${color?.color} ${color?.bgColor} rounded-full`}
          >
            {assignedTeam}
          </span>
          <h4 className="mt-3 text-sm font-medium">{projectTitle}</h4>
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

            <img
              className={`w-10 h-10  ml-auto rounded-full`}
              src={creatorImg}
              alt="creator"
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Project;
