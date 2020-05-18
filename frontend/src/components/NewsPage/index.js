import React from 'react';

const NewsPage = (props) => (
    <main>
        <h2>{props.newsData.title}</h2>
        <h5>Автор: {props.newsData.author}</h5>
        <p>{props.newsData.text}</p>
    </main>
);

export default NewsPage;