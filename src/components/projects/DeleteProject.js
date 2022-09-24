import React from "react";
import { useSelector } from "react-redux";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";

const DeleteProject = () => {
  const { deleteProjectId } = useSelector((state) => state.projects) || {};
  const [deleteProject] = useDeleteProjectMutation();
  const handleDelete = () => {
    deleteProject({
      id: deleteProjectId,
      status: "Backlog",
    })
      .unwrap()
      .then(() => {
        document.getElementById("delete-project").checked = false;
      });
  };
  return (
    <>
      <input type="checkbox" id="delete-project" className="modal-toggle" />
      <label htmlFor="delete-project" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3
            className="
          text-xl font-bold text-center"
          >
            Are you sure you want to delete this project? This action cannot be
            undone.
          </h3>
          <div className="flex justify-center mt-8">
            <label
              onClick={() => {
                document.getElementById("project-option").checked = true;
              }}
              htmlFor="delete-project"
              className="btn mx-auto btn-sm rounded-full border-none hover:bg-red-600  bg-red-500 text-white"
            >
              Cancel
            </label>
            <button
              onClick={handleDelete}
              className="btn block mx-auto btn-sm rounded-full btn-primary"
            >
              Delete Project
            </button>
          </div>
        </label>
      </label>
    </>
  );
};

export default DeleteProject;
