import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import './Row.css'
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
function Row(props){
    const [movies,setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState('');
    useEffect(() =>{

        async function fetchData() {
            const request = await axios.get(props.fetchUrl).then(res=>{
                setMovies(res.data.results);
            })
            
            return request;
        }
        fetchData();
    },[props.fetchUrl])
    const opts = {
        height: "390",
        width:"100%",
        playerVars:{
           // https://developers.google.com/youtube/player_parameters
             autoplay: 1,

        }

    }

    const handleClick = (val)=>{
        console.log('asd')
        if(trailerUrl) {
            console.log('aaaaa')
            setTrailerUrl('');
        }
        else
        {
            movieTrailer(val?.name||val?.title||'')
            .then(url=>{
                let params = new URLSearchParams(new URL(url).search)
                setTrailerUrl(params.get('v'));
                console.log(trailerUrl)
            })
            .catch(err=>{console.log(err)})
        }
    }
    return(
        <div className="row" style={{marginLeft:"20px"}}>
            <h2>{props.title}</h2>
            <div className={`row_posters`}> 
                {movies.map((val)=>(
                    <img key={val.id} className={`row_poster ${props.isLargeRow && "row_posterLarge"}`} onClick={()=>{handleClick(val)}} src={`https://image.tmdb.org/t/p/original/${props.isLargeRow?val.poster_path:val.backdrop_path}`} alt={val.name}></img>
                ))}
            </div>
           {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}></Youtube>}
        </div>
    )
}

export default Row;