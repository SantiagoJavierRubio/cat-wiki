import React from 'react';
import './CatArticle.css';

const CatArticle = () => {
    return(
        <div className="article-page">
            <h3>Why should you have a cat?</h3>
            <h4>Read this article from Mental Floss to know</h4>
            <iframe src="https://www.mentalfloss.com/article/51154/10-scientific-benefits-being-cat-owner" />
        </div>
    )
}

export default CatArticle;