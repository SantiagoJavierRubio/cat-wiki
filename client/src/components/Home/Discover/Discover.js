import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Discover.css';

const Discover = () => {

    const [top4, setTop4] = useState();

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
                    newTop.push({ name: breed.breeds[0].name, url: breed.url, id: breed.breeds[0].id })
                } else {
                    newTop.push({ name: breed.name, url: breed.image.url, id: breed.id })
                }
            })
            setTop4(newTop)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        getTopBreeds(4);
    }, [])

    return(
        <div className="home-middle">
            <div className="head">
                <h3 className="title">66+ Breeds for you to discover</h3>
                <Link to="/most_searched" className="more-link">SEE MORE <span className="material-icons">arrow_right_alt</span></Link>
            </div>
            <div className="top-breeds">
                {top4 ? top4.map(breed => {
                    return (
                            <div key={breed.name} className="breed">
                                <Link to={`/breed/${breed.id}`} className="router-link">
                                    <img src={breed.url} />
                                    <h6>{breed.name}</h6>
                                </Link>
                            </div>
                        )
                    }) : 
                    <div>
                        <div className="breed placeholder-item">
                        </div>
                        <div className="breed placeholder-item">
                        </div>
                        <div className="breed placeholder-item">
                        </div>
                        <div className="breed placeholder-item">
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Discover;