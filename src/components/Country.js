import React from 'react'

const Country = ({country}) => {
  return (
    <div className='country'>
      <div className='country-image'>
        <img alt={country.name}src={country.flag}/>
      </div>
      <div className='country-info'>
        <h2>{country.name}</h2>
        <ul>
          <li>
            <span>Region :
            </span>
            {country.region}
          </li>
          <li>
            <span>Area :
            </span>
            {country.area}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Country