import React from "react";
import { useSelector } from "react-redux";
import { useDeleteTeamMutation } from "../../features/teams/teamsApi";

const DeleteTeam = () => {
  const {teamId} = useSelector((state) => state.teams) || {};
  const {user} = useSelector((state) => state.auth) || {};
  const {email} = user || {};
  const [deleteTeam] = useDeleteTeamMutation();
  const handleDelete = () => {
    deleteTeam({
      id: teamId,
      creator : email
    }).unwrap().then((res) => {
      document.getElementById("delete-team").checked = false;
    })
  }
  return (
    <>
      <input type="checkbox" id="delete-team" className="modal-toggle" />
      <label htmlFor="delete-team" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3
          className="
          text-xl font-bold text-center"
          >
            Are you sure you want to delete this team? This action cannot be
            undone.
          </h3>
          <div className="flex justify-center mt-8">
            <label
              htmlFor="delete-team"
              className="btn mx-auto btn-sm rounded-full border-none hover:bg-red-600  bg-red-500 text-white"
            >
              Cancel
            </label>
            <button 
            onClick={handleDelete}
            className="btn block mx-auto btn-sm rounded-full btn-primary">
              Delete Team
            </button>
          </div>
        </label>
      </label>
    </>
  );
};

export default DeleteTeam;
