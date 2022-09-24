import { Droppable } from "@hello-pangea/dnd";
import React from "react";
import { useGetProjectsQuery } from "../../../features/projects/projectsApi";
import Project from "../Project";

const Blocked = () => {
  const { data: blockedProjects, isLoading, isError } = useGetProjectsQuery("Blocked");
  let content;

  if (blockedProjects?.length > 0 && !isLoading && !isError) {
    content = blockedProjects?.map((project, index) => (
      <Project
      index={index}
        key={project.id}
        project={project}
      />
    ));
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Blocked</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {blockedProjects?.length ? blockedProjects?.length : 0}
        </span>
      </div>
      <Droppable droppableId="Blocked">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col pb-2 min-h-screen ${
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

export default Blocked;
