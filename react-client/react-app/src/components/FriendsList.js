import React, {useState,useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

export const JokesList = () => {

    const [jokesList, setJokesList] = useState([]);

    useEffect(()=>{
        const getData = () => {
            axiosWithAuth()
                .get('/api/jokes')
                .then(res => {
                    console.log(res);
                    setJokesList(res.data);
                })
                .catch(err => err.resnopse)
        };

        getData();
    }, [])
    
    return(
        <>
            <h1>Dad`s Jokes</h1>
            <div className="jokes-list">
                {
                    jokesList.map(joke => (
                        <div className="each-joke" key={joke.id}>
                            <h3>joke: {joke.joke}</h3>
                        </div>
                    ))
                }
            </div>
        </>
    )
}