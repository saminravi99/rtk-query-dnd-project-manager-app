import React from "react";
import { useDispatch } from "react-redux";
import { teamSelected } from "../../features/teams/teamsSlice";
import AddMember from "./AddMember";
import DeleteTeam from "./DeleteTeam";
import ViewMembers from "./ViewMembers";

const TeamOptions = ({ teamId }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="dropdown dropdown-end">
        <button
          onClick={() => {
            dispatch(teamSelected({ teamId }));
          }}
          tabIndex={1}
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
        </button>
        <ul
          tabIndex={1}
          className="dropdown-content menu p-2 shadow-xl bg-base-200 rounded-box w-52"
        >
          <li>
            <label htmlFor="add-member" className="modal-button">
              Add Members
            </label>
          </li>
          <li>
            <label htmlFor="view-members" className="modal-button">
              View Members
            </label>
          </li>
          <li className="hover:bg-red-500  hover:text-white ">
            <label htmlFor="delete-team" className="modal-button">
              Delete Team
            </label>
          </li>
        </ul>
      </div>
      <AddMember />
      <DeleteTeam />
      <ViewMembers />
    </>
  );
};

export default TeamOptions;
