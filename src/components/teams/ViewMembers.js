import React from "react";
import { useSelector } from "react-redux";
import { useGetTeamQuery } from "../../features/teams/teamsApi";

const ViewMembers = () => {
  const { teamId } = useSelector((state) => state.teams);
  const {
    data: team,
    isLoading,
    isError,
  } = useGetTeamQuery(teamId, { skip: !teamId });
  let content;
  if (team?.membersDetails?.length > 0 && !isLoading && !isError) {
    content = team?.membersDetails?.map((member) => {
      return (
        <div
          key={member.email}
          className="flex flex-col items-center justify-center w-1/2 mx-auto"
        >
          <div className="flex flex-col items-center justify-center">
            <img src={member.img} alt="" className="w-20 h-20 rounded-full" />
            <h2 className="font-bold">{member.name}</h2>
            <p className="text-gray-500">{member.email}</p>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <input type="checkbox" id="view-members" className="modal-toggle" />
      <label htmlFor="view-members" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            onClick={() => {
              document.getElementById("project-option").checked = true;
            }}
            htmlFor="view-members"
            className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-2xl font-bold text-center my-4">
            Members of{" "}
            <span className={`text-${team?.teamColor}-500`}>
              {team?.teamName}
            </span>{" "}
            Team
          </h2>
          {/* Grid of two column */}
          <div className="grid grid-cols-2 gap-4">{content}</div>
        </label>
      </label>
    </>
  );
};

export default ViewMembers;
