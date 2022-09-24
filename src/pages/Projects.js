import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import AddProject from "../components/projects/AddProject";
import Backlog from "../components/projects/Backlog/Backlog";
import Blocked from "../components/projects/Blocked/Blocked";
import ChangeTeam from "../components/projects/ChangeTeam";
import DeleteProject from "../components/projects/DeleteProject";
import Doing from "../components/projects/Doing/Doing";
import Done from "../components/projects/Done/Done";
import Ready from "../components/projects/Ready/Ready";
import Review from "../components/projects/Review/Review";
import ViewMembers from "../components/teams/ViewMembers";
import {
  useChangeStatusMutation,
  useGetProjectQuery,
} from "../features/projects/projectsApi";
import { useSelector } from "react-redux";
import { apiSlice } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";

const Projects = () => {
  const dispatch = useDispatch();
  const { projectId } = useSelector((state) => state.projects) || {};
  const { data: project } = useGetProjectQuery(projectId, { skip: !projectId });
  // const { projectStatus } = project || {};
  // console.log(projectStatus);
  const [changeStatus] = useChangeStatusMutation();
  const onDragEnd = (result) => {
    const { source, destination } = result || {};
    console.log(result);
    console.log(source, destination);
    const { droppableId: sourceId, index: sourceIndex } = source || {};
    const { droppableId: destinationId, index: destinationIndex } =
      destination || {};

    if (!destination) {
      return;
    }

    if (sourceId === destinationId && sourceIndex === destinationIndex) {
      return;
    }

    const object = {
      id: projectId,
      data: {
        status: destinationId,
      },
      status: sourceId,
    };

    console.log(object);
    if (destinationId && sourceId && projectId) {
      changeStatus({
        id: projectId,
        data: {
          projectStatus: destinationId,
        },
        status: sourceId,
        destinationStatus: destinationId
      })
        .unwrap()
        .then((res) => {
          //manually invalidate tags
          // dispatch(apiSlice.util.invalidateTags(["Projects"]));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {" "}
        <div className="px-10 mt-6">
          <h1 className="text-2xl font-bold">Project Board</h1>
        </div>
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <Backlog />
          <Ready />
          <Doing />
          <Review />
          <Blocked />
          <Done />
          <div className="flex-shrink-0 w-6"></div>
        </div>
        <AddProject />
        <DeleteProject />
        <ViewMembers />
        <ChangeTeam />
      </DragDropContext>
    </>
  );
};

export default Projects;
