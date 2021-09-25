import React from 'react';
import './Selector.css';
import Select from 'react-select';

const Selector = (props) => {

    const { breeds, setSelection, isLoading } = props;

    const customStyles = {
        control: (provided) => ({
          // none of react-select's styles are passed to <Control />
          ...provided,
          borderRadius: '59px',
          height: '3.1vw',
          fontSize: '1.7vw',
          padding: '.1vw 1vw .1vw 1vw'
        }),
        menuList: (provided) => ({
            ...provided,
            borderRadius: '24px',
        }),
        menu: (provided) => ({
            ...provided,
            padding: '1vw',
            borderRadius: '24px',
            fontSize: '2vw',
        }),
        option: (styles, { isFocused }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? 'rgba(151, 151, 151, 0.1)' : '#FFF',
                borderRadius: '12px',
                marginTop: '.2vw',
            }
        }
    }

    return(
        <Select
            className="search-bar"
            options={breeds} 
            placeholder="Enter your breed" 
            onChange={setSelection}
            noOptionsMessage={()=>"Breed not found"}
            isLoading={isLoading}
            styles={customStyles}
            isSearchable
            isClearable
        />
    )
}

export default Selector;
