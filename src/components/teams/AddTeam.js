import React, { useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useGetMembersQuery } from "../../features/auth/authApi";
import { useAddTeamMutation } from "../../features/teams/teamsApi";
import { colorSelected } from "../../features/teams/teamsSlice";
import ColorPallette from "../ui/ColorPallette";
import Error from "../ui/Error";

const AddTeam = () => {
  const dispatch = useDispatch();
  const [addTeam, { data: team }] = useAddTeamMutation();
  const { data: members, isLoading, isError, error } = useGetMembersQuery();
  const { color } = useSelector((state) => state.teams) || {};
  const auth = useSelector((state) => state.auth);
  const { user } = auth || {};
  const { email, img, id } = user || {};
  let options = [];
  if (members?.length > 0 && !isLoading && !isError) {
    options = members
      .filter((member) => member.email !== email)
      .map((member) => {
        return {
          value: member.email,
          label: member.name,
          memberDetails: member,
        };
      });
  }
  const [formError, setFormError] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [teamMembers, setTeamMembers] = useState(null);
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

  let teamMembersString = "";
  let membersDetailsArray = [];
  if (teamMembers) {
    teamMembersString =
      email + "-" + teamMembers.map((member) => member.value).join("-");
    membersDetailsArray = [
      user,
      ...teamMembers.map((member) => member.memberDetails),
    ];
  }

  if (teamMembers?.length === 0) {
    membersDetailsArray = [];
    teamMembersString = "";
  }

  const teamObject = {
    teamName,
    teamTitle,
    creatorImg: img,
    createdAt: `${months[new Date().getMonth()]} ${new Date().getDate()}`,
    teamMembers: teamMembersString,
    membersDetails: membersDetailsArray,
    teamColor: color,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      teamName,
      teamTitle,
      teamMembers,
      teamColor,
      creatorImg,
      createdAt,
      membersDetails,
    } = teamObject || {};
    if (
      teamName &&
      teamTitle &&
      teamMembers &&
      teamColor &&
      creatorImg &&
      createdAt &&
      membersDetails.length > 0
    ) {
      addTeam({ creatorEmail: email, data: teamObject })
        .unwrap()
        .then((res) => {
          //close modal
          document.getElementById("add-team").checked = false;
        });
    } else {
      setFormError("Please fill all the fields");
    }
    setTeamName("");
    setTeamTitle("");
    setTeamMembers(null);
    dispatch(colorSelected(""));
    teamMembersString = "";
    membersDetailsArray = [];
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
      <input type="checkbox" id="add-team" className="modal-toggle" />
      <label htmlFor="" className="modal cursor-pointer">
        <label className="modal-box relative h-auto" htmlFor="">
          <label
            htmlFor="add-team"
            onClick={() => dispatch(colorSelected(""))}
            className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
          >
            ✕
          </label>
          <form onSubmit={handleSubmit} className="" action="">
            <label className="label">
              <span className="label-text block mx-auto">Team Name</span>
            </label>
            <input
              value={teamName}
              type="text"
              placeholder="Enter Team Name"
              onChange={(e) => setTeamName(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs  block mx-auto"
            />
            <label className="label">
              <span className="label-text block mx-auto mt-2">Team Title</span>
            </label>
            <input
              value={teamTitle}
              type="text"
              placeholder="Enter Team Title"
              onChange={(e) => setTeamTitle(e.target.value)}
              className="input input-bordered input-primary w-full max-w-xs  block mx-auto"
            />
            <label className="label mt-8">
              <span className="input-primary label-text block mx-auto">
                Assign Team Member
              </span>
            </label>
            <Select
              value={teamMembers}
              placeholder="Available Team Members"
              className="w-full max-w-xs block mx-auto mt-2"
              isMulti
              onChange={(e) => {
                setTeamMembers(e);
              }}
              options={options}
            />
            <label className="label mt-8">
              <span className="input-primary label-text block mx-auto">
                Assign Team Color
              </span>
            </label>
            <div className="w-full max-w-xs mx-auto mt-2">
              {/* Make rounded circles filled with color */}
              <ColorPallette />
            </div>
            <div className="flex justify-center mt-8">
              <label
                htmlFor="add-team"
                onClick={() => {
                  dispatch(colorSelected(""));
                }}
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

export default AddTeam;
