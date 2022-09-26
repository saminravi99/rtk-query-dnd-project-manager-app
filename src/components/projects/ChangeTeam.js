import React, { useEffect, useState } from "react";
import Select from "react-select";
import {useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import {
  useChangeTeamMutation,
  useGetProjectQuery,
} from "../../features/projects/projectsApi";

const ChangeTeam = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth || {};
  const { email } = user || {};

  const {changeTeamProjectId } = useSelector((state) => state.projects) || {};
  const { data: project } = useGetProjectQuery(changeTeamProjectId, { skip: !changeTeamProjectId });

  const { data: teams, isLoading, isError} = useGetTeamsQuery(email);
  const [changeTeam] = useChangeTeamMutation();
  const { teamName } = useSelector((state) => state.teams) || {};
  const [team, setTeam] = useState(null);
  const [formError, setFormError] = useState("");

  let options = [];
  if (teams?.length > 0 && !isLoading && !isError) {
    options = teams
      .filter((team) => team.teamName !== teamName)
      .map((team) => {
        return {
          value: team?.teamName,
          label: team?.teamName,
          memberDetails: team?.membersDetails,
          teamId: team?.id,
          teamMembers: team?.teamMembers
        };
      });
  }

  const changedTeam = {
    assignedTeam: team?.value || "",
    teamId: team?.teamId || "",
    teamMembers: team?.teamMembers || "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { assignedTeam, teamId } = changedTeam;
    if (assignedTeam && teamId) {
      changeTeam({
        id: project?.id,
        data: changedTeam,
        status: "Backlog",
        email
      })
        .unwrap()
        .then((res) => {
          document.getElementById("change-team").checked = false;
          // dispatch(apiSlice.util.invalidateTags(["Project"]));
        });
    } else {
      setFormError("Please select a team");
    }
    setTeam(null);
  };

  //remove form error after 3 seconds
  useEffect(() => {
    if (formError) {
      setTimeout(() => {
        setFormError("");
      }, 2000);
    }
  }, [formError]);

  return (
    <>
      <input type="checkbox" id="change-team" className="modal-toggle" />
      <label htmlFor="" className="modal cursor-pointer">
        <label className="modal-box relative h-96" htmlFor="">
          <label
            onClick={() => {
              document.getElementById("project-option").checked = true;
            }}
            htmlFor="change-team"
            className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="" action="">
            <label className="label mt-8">
              <span className="input-primary label-text block mx-auto">
                Change Team
              </span>
            </label>
            <Select
              isClearable={true}
              value={team}
              placeholder="Available Teams"
              className="w-full max-w-xs block mx-auto mt-2"
              onChange={(e) => setTeam(e)}
              options={options}
            />

            <div className="flex justify-center mt-8">
              <label
                onClick={() => {
                  document.getElementById("project-option").checked = true;
                }}
                htmlFor="change-team"
                className="btn mx-auto btn-sm rounded-full border-none hover:bg-red-600  bg-red-500 text-white"
              >
                Cancel
              </label>
              <button className="btn block mx-auto btn-sm rounded-full btn-primary">
                Add Team
              </button>
            </div>
          </form>
          {formError && <Error message={formError} />}
        </label>
      </label>
    </>
  );
};

export default ChangeTeam;
