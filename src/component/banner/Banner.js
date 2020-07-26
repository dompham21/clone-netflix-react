import React,{useState,useEffect} from 'react';
import axios from '../../api/axios';
import requests from '../../api/request';
import './banner.css'
function Banner(){
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request =  await axios.get(requests.fetchNetflixOriginals);
            setMovies(request.data.results[Math.floor(Math.random()*request.data.results.length -1)]);
            console.log(request)
            return request;
        }
        
        fetchData();
    },[]);
    function truncate(str,n){
        return str?.length>n ? str.substr(0,n-1) + '...' : str;
    }
    return(
        <header className="banner" style={{backgroundSize:'cover',backgroundPosition:"center center",backgroundRepeat:"no-repeat",backgroundImage:`url("https://image.tmdb.org/t/p/original/${movies.poster_path}")`}}>
            <div className="banner_content">
                <h1 className="banner_title">{movies?.title||movies?.name||movies?.original_name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <p className="banner_description">{truncate(movies.overview,155)}</p>
            </div>
            <div className="banner--fadeBottom"></div>
        </header>
    )
}

export default Banner;