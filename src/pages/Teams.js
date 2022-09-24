import React from "react";
import { useSelector } from "react-redux";
import AddTeam from "../components/teams/AddTeam";
import Team from "../components/teams/Team";
import Loader from "../components/ui/Loader";
import { useGetTeamsQuery } from "../features/teams/teamsApi";

const Teams = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth || {};
  const { email } = user || {};
  const { data: teams, isLoading, isError } = useGetTeamsQuery(email);

  let content;
  if (teams?.length > 0 && !isLoading && !isError) {
    content = teams.map((team) => <Team key={team.id} team={team} />);
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="px-10 mt-6 flex justify-between">
            <h1 className="text-2xl font-bold">Teams</h1>

            <label
              htmlFor="add-team"
              className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100 modal-button"
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 ">
            {content}
            {/* Modals of Teams Page */}
            <AddTeam />
          </div>
        </>
      )}
    </>
  );
};

export default Teams;
