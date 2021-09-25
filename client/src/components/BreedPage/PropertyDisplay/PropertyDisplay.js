import React, { useState, useEffect } from "react";
import './PropertyDisplay.css'

const PropertyDisplay = (props) => {

    const { property, value } = props;
    const [points, setPoints] = useState([]);

    const createPointArray = () => {
        const newArray = [];
        for(let i=1; i<=5; i++){
            if(i<=value){
                newArray.push(true)
            } else {
                newArray.push(false)
            }
        }
        return(newArray);
    }

    useEffect(() => {
        setPoints(createPointArray);
    }, [])

    return(
        <div className="display">
            <p><strong>{property}: </strong></p>
            <div className="property-score">
                {points.map((point, index) => {
                    if(point){
                        return <div className="point fill-point" key={index}></div>
                    } else {
                        return <div className="point empty-point" key={index}></div>
                    }
                })}
            </div>
        </div>
    )
}

export default PropertyDisplay;