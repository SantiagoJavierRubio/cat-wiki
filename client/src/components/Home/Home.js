import React from "react";
import Discover from './Discover/Discover';
import Search from './Search/Search';

const Home = () => {
    return(
        <div>
            <Search />
            <Discover />
        </div>
    )
}

export default Home;