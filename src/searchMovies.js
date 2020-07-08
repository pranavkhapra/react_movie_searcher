import React, {useState} from "react";
import MovieCards from "./components/movieCards";

export default function SearchMovies(){
    
    
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    
    const searchMovies = async (event) => {
        event.preventDefault();
                
        const url = `https://api.themoviedb.org/3/search/movie?api_key=46fce8fce5304a4cb8757a4043efba3f&language=en-US&query=${query}&page=1&include_adult=true`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results);
        }catch(error){
            console.error(error);
        }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic Park"
                    value={query} onChange={function(event){
                        setQuery(event.target.value)}
                    }
                    />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(function(movie){
                return movie.poster_path
                }).map(
                    function(movie){
                        return(
                    <MovieCards movie={movie} key={movie.id}/>

                )})}
            </div>    
        </>
    )
}