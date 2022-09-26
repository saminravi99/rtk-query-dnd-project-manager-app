import React from 'react'
import { Droppable } from "@hello-pangea/dnd";
import { useGetProjectsQuery } from '../../../features/projects/projectsApi';
import Project from '../Project';
import { useSelector } from 'react-redux';

const Done = () => {
   const { user } = useSelector((state) => state.auth) || {};
   const { email } = user || {};
  const {
    data: doneProjects,
    isLoading,
    isError,
  } = useGetProjectsQuery({ status: "Done", email });
  let content;

  if (doneProjects?.length > 0 && !isLoading && !isError) {
    content = doneProjects?.map((project, index) => (
      <Project 
      index={index}
      key={project.id} project={project} />
    ));
  }

  return (
    <div className="flex flex-col flex-shrink-0 w-72">
      <div className="flex items-center flex-shrink-0 h-10 px-2">
        <span className="block text-sm font-semibold">Done</span>
        <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
          {doneProjects?.length ? doneProjects?.length : 0}
        </span>
      </div>
      <Droppable droppableId="Done">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
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

export default Done