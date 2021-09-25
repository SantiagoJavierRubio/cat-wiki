import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router';
import './Modal.css';

const Modal = (props) => {
    
    const { closeModal, breedList } = props;
    const [filter, setFilter] = useState('');
    const [filteredList, setFilteredList] = useState([]);
    const history = useHistory();

    const changeFilter = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        const newList = breedList.filter(breed => breed.label.toLowerCase().includes(filter.toLowerCase()));
        setFilteredList(newList);
    }, [filter]);

    const handleSelection = (value) => {
        history.push(`/breed/${value}`);
        closeModal();
    }

    return(
        <div className="backdrop" onClick={closeModal}>
            <div className="modal-box" onClick={e=>e.stopPropagation()}>
                <button onClick={closeModal} className="modal-close-button"><span className="material-icons">close</span></button>
                <div className="modal-search">
                    <input type="text" onChange={changeFilter} />
                    <span className="material-icons">search</span>
                </div>
                <div className="breed-list">
                    {filteredList[0] ? 
                        filteredList.map(breed => {
                            return <button onClick={e=>handleSelection(breed.value)} 
                                    className="breed-list-option"
                                    key={breed.value}>
                                        {breed.label}
                                    </button>
                        }) : <h5>No breeds found</h5>
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal;