import { Droppable } from "@hello-pangea/dnd";
import React from "react";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";
import Project from "../Project";

const Backlog = () => {
  const {data: backlogProjects, isLoading, isError} = useGetProjectsQuery("Backlog");
  let content;

  if(backlogProjects?.length > 0 && !isLoading && !isError) {
    content = backlogProjects?.map((project, index) => (
      <Project 
      index={index}
      key={project.id} project={project} status={project?.projectStatus} />
    ));
  }
  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Backlog</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {backlogProjects?.length ? backlogProjects.length : 0}
        </span>
        <label
          htmlFor="add-project"
          className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
        </label>
      </div>
      <Droppable droppableId="Backlog">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col pb-2 min-h-screen  ${
              snapshot.isDraggingOver ? "bg-indigo-100" : ""
            } `}
          >
            {content}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Backlog;
