import React from "react";
import { useDispatch} from "react-redux";
import { changeTeamProjectId} from "../../features/projects/projectsSlice";
import { teamSelected } from "../../features/teams/teamsSlice";

const ProjectOptions = ({ teamId, teamName, projectId }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label
          htmlFor="project-option"
          tabIndex={1}
          onClick={() => {
            dispatch(teamSelected({ teamId, teamName }));
            dispatch(changeTeamProjectId({ changeTeamProjectId: projectId }));
          }}
          className="flex items-center justify-center  w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
        >
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </label>
      </div>
      {/* <label htmlFor="my-modal-4" className="btn modal-button">
        open modal
      </label> */}

      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="project-option" className="modal-toggle" />
      <label htmlFor="project-option" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="project-option"
            className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
          >
            ✕
          </label>
          <ul
            tabIndex={1}
            className="menu pt-3 w-auto font-bold hover:rounded-xl"
          >
            <li>
              <label
                onClick={() => {
                  document.getElementById("project-option").checked = false;
                }}
                htmlFor="change-team"
                className="modal-button"
              >
                Change Team
              </label>
            </li>
            <li>
              <label
                onClick={() => {
                  document.getElementById("project-option").checked = false;
                }}
                htmlFor="view-members"
                className="modal-button"
              >
                View Team Members
              </label>
            </li>
            <li className="hover:bg-red-500  hover:text-white ">
              <label
                onClick={() => {
                  document.getElementById("project-option").checked = false;
                }}
                htmlFor="delete-project"
                className="modal-button"
              >
                Delete Project
              </label>
            </li>
          </ul>
        </label>
      </label>
    </>
  );
};

export default ProjectOptions;
