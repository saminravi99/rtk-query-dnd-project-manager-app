import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import Select from "react-select";
import { useAddProjectMutation } from "../../features/projects/projectsApi";
import Error from "../ui/Error";

const AddProject = () => {
  const auth = useSelector((state) => state.auth);
  const { user } = auth || {};
  const { email } = user || {};

  const { data: teams, isLoading, isError, error } = useGetTeamsQuery(email);
  const [addProject] = useAddProjectMutation();

  const [projectName, setProjectName] = useState("");
  const [team, setTeam] = useState(null);
  const [formError, setFormError] = useState("");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const projectData = {
    teamId: team?.teamId || "",
    creatorImg: user.img,
    createdAt: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    assignedTeam: team?.value || "",
    projectStatus: "Backlog",
    projectTitle: projectName,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { assignedTeam, teamId } = projectData;
    if (!assignedTeam || !teamId) {
      setFormError("Please select a team");
    }
    if (projectName && Object.keys(team).length > 0 && assignedTeam && teamId) {
      addProject({
        status: "Backlog",
        data: projectData,
      })
        .unwrap()
        .then((res) => {
          document.getElementById("add-project").checked = false;
        });
    } else {
      setFormError("Please fill all the fields");
    }

    setProjectName("");
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

  let options = [];
  if (teams?.length > 0 && !isLoading && !isError) {
    options = teams.map((team) => {
      return {
        value: team.teamName,
        label: team.teamName,
        memberDetails: team.membersDetails,
        teamId: team.id,
      };
    });
  }
  return (
    <>
      <input type="checkbox" id="add-project" className="modal-toggle" />
      <label htmlFor="" className="modal cursor-pointer">
        <label className="modal-box relative h-96" htmlFor="">
          <label
          
            htmlFor="add-project"
            className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="" action="">
            <label className="label">
              <span className="label-text block mx-auto">Project Title</span>
            </label>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              placeholder="Enter Project Title"
              className="input input-bordered input-primary w-full max-w-xs  block mx-auto"
            />
            <label className="label mt-8">
              <span className="input-primary label-text block mx-auto">
                Assign Team
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
                htmlFor="add-project"
                className="btn mx-auto btn-sm rounded-full border-none hover:bg-red-600  bg-red-500 text-white"
              >
                Cancel
              </label>
              <button className="btn block mx-auto btn-sm rounded-full btn-primary">
                Add Project
              </button>
            </div>
          </form>
          {formError && <Error message={formError} />}
        </label>
      </label>
    </>
  );
};

export default AddProject;
