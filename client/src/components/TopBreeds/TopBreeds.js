import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TopBreeds.css';

const TopBreeds = () => {

    const [top10, setTop10] = useState();

    const array10 = [0,1,2,3,4,5,6,7,8,9];

    const getTopBreeds = async (amount) => {
        const newTop = []
        try {
            const response = await axios.get(process.env.REACT_APP_API_URI + '/log/most_visited', {
                params: {
                    amount: amount
                }
            })
            response.data.forEach(breed => {
                if(breed.url){
                    newTop.push({ id: breed.breeds[0].id, name: breed.breeds[0].name, url: breed.url, about: breed.breeds[0].description })
                } else {
                    newTop.push({ id: breed.id, name: breed.name, url: breed.image.url, about: breed.description })
                }
            })
            setTop10(newTop)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        getTopBreeds(10);
    }, [])

    return(
        <div className="top-main">
            <h2>Top 10 most searched breeds</h2>
            <div className="top-list">
                {top10 ? top10.map((breed, index)=> {
                    return (
                            <div className="top-breed" key={breed.name}>
                                <Link to={`/breed/${breed.id}`} className="router-link">
                                    <img className="breed-img" src={breed.url} />
                                </Link>
                                <div className="breed-info">
                                    <h3>{index+1}. {breed.name}</h3>
                                    <p>{breed.about}</p>
                                </div>
                            </div>
                        )
                    }) : 
                array10.map(_ => {
                    return (
                        <>
                            <div className="top-breed">
                                <div className="breed-img placeholder-item" />
                                <br />
                                <div className="breed-info placeholder-item load-marg">
                                    <br /><br /><br /><br /><br /><br /><br />
                                </div>
                            </div>
                            <br />
                        </>
                    )})
                }
            </div>
    </div>
    )
}

export default TopBreeds;