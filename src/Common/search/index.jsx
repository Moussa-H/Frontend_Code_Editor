import React from "react";
import { useState } from "react";
import './style.css'

const Search = ()=>{
const [inputValue, setInputValue]=useState('')
  const handleSearchChange = (e)=>{
      setInputValue(e.target.value)
  
  }
  console.log(inputValue)
  return(
    <div className="search-container">
      <input
      type="text"
      placeholder="Search for.."
      value={inputValue}
      onChange={handleSearchChange} />
    </div>
  )
}


export default Search