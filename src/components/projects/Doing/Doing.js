import React from 'react'
import { Droppable } from "@hello-pangea/dnd";
import { useGetProjectsQuery } from '../../../features/projects/projectsApi';
import Project from '../Project';
import { useSelector } from 'react-redux';

const Doing = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: doingProjects,
    isLoading,
    isError,
  } = useGetProjectsQuery({ status: "Doing", email });

  let content;

  if (doingProjects?.length > 0 && !isLoading && !isError) {
    content = doingProjects?.map((project, index) => (
      <Project 
      index={index}
      key={project.id} project={project} />
    ));
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Doing</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {doingProjects?.length ? doingProjects?.length : 0}
        </span>
      </div>
      <Droppable droppableId="Doing">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex flex-col pb-2 min-h-screen ${
              snapshot.isDraggingOver ? "bg-indigo-100" : ""
            }`}
          >
            {content}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default Doing