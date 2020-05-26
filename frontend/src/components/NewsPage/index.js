import React from 'react';

const NewsPage = (props) => (
    <main>
        <h2 className="news-page__title">{props.newsData.title}</h2>
        <div className="news-page">            
            <div className="news-page__info">
                <p>{props.newsData.date}</p>
                <h5>Автор: {props.newsData.author}</h5>
                <p className="news-page__text">{props.newsData.text}</p>
            </div>
            <img src={props.newsData.picture} alt="illustration" className="news-page__picture"/>
        </div>
    </main>
);

export default NewsPage;