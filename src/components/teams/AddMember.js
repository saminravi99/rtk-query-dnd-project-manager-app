import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { useGetMembersQuery } from "../../features/auth/authApi";
import {
  useAddTeamMemberMutation,
  useGetTeamQuery,
} from "../../features/teams/teamsApi";
import Error from "../ui/Error";

const AddMember = () => {
  const { teamId } = useSelector((state) => state.teams) || {};
  const [formError, setFormError] = useState("");

  const { data: members, isLoading, isError} = useGetMembersQuery();
  const [addTeamMember] = useAddTeamMemberMutation();
  const { data: team } = useGetTeamQuery(teamId, { skip: !teamId });
  const { membersDetails: membersDetailsArray } = team || {};
  const [teamMembers, setTeamMembers] = useState(null);

  let teamMembersString = "";
  let membersDetailsArrayBody = [];
  if (teamMembers) {
    teamMembersString =
      team.teamMembers +
      "-" +
      teamMembers.map((member) => member.value).join("-");

    membersDetailsArrayBody = [
      ...membersDetailsArray,
      ...teamMembers.map((member) => member.memberDetails),
    ];
  }

  if (teamMembers?.length === 0) {
    membersDetailsArrayBody = [];
    teamMembersString = "";
  }

  let editedTeamMembers = {
    teamMembers: teamMembersString,
    membersDetails: membersDetailsArrayBody,
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamMembersString && membersDetailsArrayBody.length > 0) {
      addTeamMember({
        id: teamId,
        data: editedTeamMembers,
      })
        .unwrap()
        .then((res) => {
          //close modal
          document.getElementById("add-member").checked = false;
        });
    } else {
      setFormError("Please select at least one member");
    }
    setTeamMembers(null);
    teamMembersString = "";
    membersDetailsArrayBody = [];
  };

  let options;
  if (
    members?.length > 0 &&
    membersDetailsArray?.length > 0 &&
    !isLoading &&
    !isError
  ) {
    options = members
      ?.filter((member) => {
        return !membersDetailsArray?.some(
          (memberDetails) => memberDetails.email === member.email
        );
      })
      ?.map((member) => {
        return {
          value: member.email,
          label: member.name,
          memberDetails: member,
        };
      });
  }

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
      <input type="checkbox" id="add-member" className="modal-toggle" />
      <label htmlFor="" className="modal cursor-pointer">
        <label className="modal-box relative h-96" htmlFor="">
          <div className="mt-24">
            <label
              htmlFor="add-member"
              className="btn btn-sm font-bold text-xl border-white hover:border-white hover:bg-white btn-circle bg-white text-red-600  absolute right-2 top-2"
            >
              ✕
            </label>
            <form onSubmit={(e) => handleSubmit(e)} className="" action="">
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
                onChange={(e) => setTeamMembers(e)}
                options={options}
              />

              <div className="flex justify-center mt-8">
                <label
                  htmlFor="add-member"
                  className="btn mx-auto btn-sm rounded-full border-none hover:bg-red-600  bg-red-500 text-white"
                >
                  Cancel
                </label>
                <button className="btn block mx-auto btn-sm rounded-full btn-primary">
                  Add Team
                </button>
              </div>
            </form>
          </div>
          {formError && <Error message={formError} />}
        </label>
      </label>
    </>
  );
};

export default AddMember;
