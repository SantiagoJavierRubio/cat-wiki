import React, { useState, useEffect } from "react";
import axios from 'axios';
import PropertyDisplay from './PropertyDisplay/PropertyDisplay';
import './BreedPage.css';

const BreedPage = ({ match }) => {

    const [breedInfo, setInfo] = useState();
    const [images, setImages] = useState({main: null, others: null});

    const getBreedInfo = async () => {
        try{
            const response = await axios.get(process.env.REACT_APP_API_URI + '/api/breed_info', {
                params: {
                    id: match.params.id
                }
            });
            setInfo(response.data)
            logVisit();
        } catch (err) {
            console.log(err)
        }
    }

    const logVisit = async () => {
        try {
            await axios.post(process.env.REACT_APP_API_URI + '/log/visit', {
                    id: match.params.id
            })
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {
        getBreedInfo()
    }, []);
    
    const defineImages = () => {
        const imageSet = {...breedInfo.images}
        let mainImage = '';
        const otherImages = []
        if(imageSet[breedInfo.data.reference_image_id]){
            mainImage = imageSet[breedInfo.data.reference_image_id]
            delete imageSet[breedInfo.data.reference_image_id]
        } else {
            mainImage = imageSet[Object.keys(imageSet)[0]]
            delete imageSet[Object.keys(imageSet)[0]]
        }
        const keys = Object.keys(imageSet);

        // case there's not enough pictures
        let picAmount = (keys.length>=8) ? 8 : keys.length;

        for(let i=0; i<picAmount; i++){
            otherImages.push(imageSet[keys[i]])
        }
        setImages({ main: mainImage, others: otherImages })
    }

    useEffect(() => {
        if(breedInfo){
            defineImages();
        }
    }, [breedInfo])

    return(
        <>
            {breedInfo ? (
                <div className="breed-page">
                    <img src={images.main} className="breed-img" />
                    <div className="breed-info">
                        <h2>{breedInfo.data.name}</h2>
                        <p className="breed-description">{breedInfo.data.description}</p>
                        <p className="description-item"><strong>Temperament: </strong>{breedInfo.data.temperament}</p>
                        <p className="description-item"><strong>Origin: </strong>{breedInfo.data.origin}</p>
                        <p className="description-item"><strong>Life Span: </strong>{breedInfo.data.life_span} years</p>
                        <div className="property-graph">
                            <PropertyDisplay property="Adaptability" value={breedInfo.data.adaptability} />
                            <PropertyDisplay property="Affection level" value={breedInfo.data.affection_level} />
                            <PropertyDisplay property="Child friendly" value={breedInfo.data.child_friendly} />
                            <PropertyDisplay property="Grooming" value={breedInfo.data.grooming} />                        
                            <PropertyDisplay property="Intelligence" value={breedInfo.data.intelligence} />                      
                            <PropertyDisplay property="Health issues" value={breedInfo.data.health_issues} />                            
                            <PropertyDisplay property="Social needs" value={breedInfo.data.social_needs} />                           
                            <PropertyDisplay property="Stranger friendly" value={breedInfo.data.stranger_friendly} />
                        </div>
                    </div>
                </div>
            ) : 
                <div className="breed-page">
                    <div className="breed-img placeholder-item" />
                    <br />
                    <div className="breed-info placeholder-item">
                        <br /><br /><br /><br /><br /><br /><br /><br />
                    </div>
                </div>}
            {images.others ? 
                <div className="more-images">
                    <h3>Other photos</h3>
                    <div className="other-photos">
                        {images.others.map((image, index) => {
                                return <img key={index} src={image} className="other-img" />
                        })}
                    </div>
                </div> 
            :   <div className="more-images">
                    <h3></h3>
                    <div className="other-photos">
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                        <div className="other-img-load placeholder-item" />
                    </div>
                </div>
            }
        </>
    )

}

export default BreedPage;