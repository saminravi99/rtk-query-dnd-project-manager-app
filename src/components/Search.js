import React from "react";
import debounce from "lodash.debounce";
import { searchedText } from "../features/projects/projectsSlice";
import { useDispatch } from "react-redux";
import { useGetSearchedProjectsQuery } from "../features/projects/projectsApi";
import { useSelector } from "react-redux";
import { apiSlice } from "../features/api/apiSlice";

const Search = () => {
  const dispatch = useDispatch();
  

  //handle change function debounce
  const handleChange = (e) => {
    e.preventDefault();
    dispatch(apiSlice.util.invalidateTags(["Projects"]));
    dispatch(searchedText({ searchedText: e.target.value }));
  };
  const debouncedSearch = debounce(handleChange, 800);

  //   const handleRemoveSearchFilter = () => {
  //     dispatch(searchedText({ searchedText: "" }));
  //     document.getElementById("search").value = "";
  //   };
  return (
    <input
      onChange={debouncedSearch}
      className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
      type="search"
      name="search"
      id="search"
      placeholder="Search for anything…"
    />
  );
};

export default Search;
