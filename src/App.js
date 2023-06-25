import {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';
import Countries from "./components/Countries";
import Header from "./components/Header";
import Pagination from './components/Pagination';
import SearchForm from './components/SearchForm';

function App() {

  const [countries,
    setCountries] = useState([]);
  const [searchCountries,
    setSearchCountries] = useState("");
  const [query,
    setQuery] = useState("");

  const [currentPage,
    setCurrentPage] = useState(1);
  const postsPerPage = 10;
  let lastPostIndex = currentPage * postsPerPage;
  let firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = countries.slice(firstPostIndex, lastPostIndex);
  const [tempCountries,
    setTempCountries] = useState([]);
  useEffect(() => {
    const fetchCountries = async() => {
      if (query === "") {
        const result = await axios('https://restcountries.com/v2/all');
        setCountries(result.data);
      } else {
        const result = await axios(`https://restcountries.com/v2/name/${query}`);
        setCountries(result.data);
      }
    };

    fetchCountries();
  }, [query]);

  const onChange = (e) => {
    setSearchCountries(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(searchCountries);
  }

  const setSortCountriesAsc = () => {
    const sortedCountries = [...countries.sort((a, b) => (a.name > b.name))]
    setCountries(sortedCountries)
    currentPosts = sortedCountries.slice(firstPostIndex, lastPostIndex)
  }

  const setSortCountriesDesc = () => {
    const sortedCountries = [...countries.sort((a, b) => (b.name > a.name))]
    setCountries(sortedCountries)
    currentPosts = sortedCountries.slice(firstPostIndex, lastPostIndex)
  }

  const filterCountryByArea = () => {
    let filteredCountries = []
    if (tempCountries.length !== 0) {
      filteredCountries = [...tempCountries.filter(country => country.area < 65300)]
    } else {
      filteredCountries = [...countries.filter(country => country.area < 65300)]
    }
    currentPosts = filteredCountries.slice(firstPostIndex, lastPostIndex)
    if (tempCountries.length === 0) {
      setTempCountries([...countries])
    }
    setCurrentPage(1)
    setCountries(filteredCountries)
  }

  const filterOceaniaRegion = () => {
    let filteredCountries = []
    if (tempCountries.length !== 0) {
      filteredCountries = [...countries.filter(country => country.region === "Oceania")]
    } else {
      filteredCountries = [...countries.filter(country => country.region === "Oceania")]
    }
    currentPosts = filteredCountries.slice(firstPostIndex, lastPostIndex)
    if (tempCountries.length === 0) {
      setTempCountries([...countries])
    }
    setCurrentPage(1)
    setCountries(filteredCountries)
  }

  const resetFilter = () => {
    const resetCountries = [...tempCountries]
    setCurrentPage(1)
    setCountries(resetCountries)
    setTempCountries([])
    currentPosts = resetCountries.slice(firstPostIndex, lastPostIndex)
  }

  const updatePagination = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="App">
      <Header/>
      <div className='page-wrapper'>
        <div className='header-components'>
          <SearchForm
            onChange={onChange}
            searchCountries={searchCountries}
            onSubmit={onSubmit}/>
          <div className='btn-wrapper'>
            <button className='btn' onClick={setSortCountriesAsc}>Ascending</button>
            <button className='btn' onClick={setSortCountriesDesc}>Descending</button>
            <div className='dropdown'>
              <a
                className='btn btn-secondary dropdown-toggle'
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Filter by
              </a>

              <ul className='dropdown-menu'>
                <li>
                  <a className='dropdown-item' href="#" onClick={resetFilter}>Reset Filter</a>
                </li>
                <li>
                  <a className='dropdown-item' href="#" onClick={filterCountryByArea}>Smaller than Lithuania by area</a>
                </li>
                <li>
                  <a className='dropdown-item' href="#" onClick={filterOceaniaRegion}>Oceania region</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Countries countries={currentPosts}/>
        <Pagination
          totalPosts={countries.length}
          postsPerPage={postsPerPage}
          setCurrentPage={updatePagination}
          currentPage={currentPage}/>
      </div>
    </div>
  );
}

export default App;