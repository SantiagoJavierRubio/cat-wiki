import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from "react-router";
import { ReactComponent as Logo } from '../../../images/CatwikiLogo.svg';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import './Search.css';
import Selector from './Selector/Selector';
import Modal from './Modal/Modal';

const Search = () => {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreed, setSelection] = useState();
    const [modalState, setModal] = useState(false);
    const history = useHistory();
    
    const loadBreeds = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URI + '/api/breeds');
        const breedList = response.data.map((breed)=> {
            return { value: breed.id, label: breed.name }
        })
        setBreeds(breedList);
    }
    
    useEffect(()=> {
        loadBreeds();
    }, []);

    useEffect(()=> {
        if(selectedBreed){
            history.push(`/breed/${selectedBreed.value}`)
        }
    }, [selectedBreed]);

    const openModal = () => {
        if(breeds[0]){
            setModal(true);
        }
    }
    const closeModal = () => {
        setModal(false);
    }

    return(
        <div className="home-top">
            <div className="content">
                <Logo className="logo" fill="white"/>
                <h2 className="title">Get to  know more about your cat breed</h2>
                <BrowserView>
                    <Selector
                        className="search-bar"
                        breeds={breeds} 
                        setSelection={setSelection} 
                        isLoading={!breeds[0]}
                    />
                </BrowserView>
                <MobileView>
                    <div className="modal-open" onClick={openModal}>
                        <h4>Search</h4>
                        <span className="material-icons">search</span>
                    </div>
                    {modalState ? 
                        <Modal closeModal={closeModal} breedList={breeds} /> 
                        :   
                        null
                    }
                </MobileView>
            </div>
        </div>
    )
}
    
export default Search;