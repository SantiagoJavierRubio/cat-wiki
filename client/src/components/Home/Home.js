import React from "react";
import Discover from './Discover/Discover';
import Search from './Search/Search';
import Article from './Article/Article';

const Home = () => {
    return(
        <div>
            <Search />
            <Discover />
            <Article />
        </div>
    )
}

export default Home;