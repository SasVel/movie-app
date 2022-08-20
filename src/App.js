import React from "react";
import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieBox from "./components/movieBox";


// 38339e77
const API_URL = 'http://www.omdbapi.com?apikey=38339e77';
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        const res = await fetch(`${API_URL}&s=${title}`)
        const searchData = await res.json()
        setMovies(searchData.Search)
    }
    useEffect(() => {
        searchMovies('Batman')
    }, [])

    return (
        <div className="app">
            <navig/>
            <h1>MovieLand</h1>

            <div className="search"
                onKeyDown={(e)=> {
                    if (e.key === 'Enter') {
                        searchMovies(searchTerm)
                    }
                }}>
                <input
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="SearchIcon"
                onClick={()=> searchMovies(searchTerm)}
                />
            </div>
            {
                movies.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => <MovieBox movie={movie}/>)}
                    </div>

                ) : (
                    <div className="empty">

                        <h2>No movies found</h2>    
                        
                    </div>
                )
            } 
            </div>
    )
}

export default App;