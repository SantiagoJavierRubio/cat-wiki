import React from "react";
import { Link } from 'react-router-dom';
import topLeft from '../../../images/image-2.png';
import downLeft from '../../../images/image-1.png';
import topRight from '../../../images/image-3.png';
import './Article.css';

const Article = () => {
    return(
        <div className="home-bottom">
            <div className="article-text">
                <div className="separator-line" />
                <h4>Why should you have a cat?</h4>
                <p>Having a cat around you can actually trigger the release of calming chemicals in your body which lower your stress and anxiety levels</p>
                <Link to="/related_article" className="more-link">
                    READ MORE <span className="material-icons">arrow_right_alt</span>
                </Link>
            </div>
            <div className="article-images">
                <div className="left-imgs">
                    <img src={topLeft} id="top-left-img"/>
                    <img src={downLeft} id="bottom-left-img" />
                </div>
                <div className="right-img">
                    <img src={topRight} id="right-img" />
                </div>
            </div>
        </div>
    )
}

export default Article;