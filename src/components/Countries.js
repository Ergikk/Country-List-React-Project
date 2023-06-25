import React, { useEffect } from 'react'
import Country from './Country'

const Countries = ({countries}) => {
  return (
    <div className='countries container'>
      {countries.map((country, index) => {
        return <Country country={country}/>
      })}
    </div>
  );
};
export default Countries