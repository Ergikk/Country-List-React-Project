import React from 'react'

const SearchForm = ({onChange, searchCountries, onSubmit}) => {
  return (
    <div className='search-form' onSubmit={onSubmit}>
      <form id="form">
        <input
          type="text"
          placeholder="   Search countries..."
          id="search"
          class="search-form"
          onChange={onChange}
          value={searchCountries}/>
      </form>
    </div>
  )
}

export default SearchForm