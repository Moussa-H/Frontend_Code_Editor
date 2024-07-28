import React from "react";
import './style.css'

const Search = ({className})=>{

  const query = ()=>{''}
  const handleSearchChange = ()=>{''}

  return(
    <div className="search-container">
      <input
      type="text"
      placeholder="Search for.."
      value={query}
      onChange={handleSearchChange} />
    </div>
  )
}


export default Search