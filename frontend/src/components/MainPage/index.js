import React from 'react';
import news from '../../images/news2.jpg';


const MainPage = () => (
    <main className="main-page">
    <div className="main-page__info">
        <h1>Добро пожаловать на новостной портал!</h1>
        <p>Здесь можно посмотреть список новостей и информацию об авторах, а также добавить собственную новость!</p>       
    </div>
    <div className="main-page__picture"><img src={news} className="main__news-picture" alt="News" title="News" ></img></div>
    </main>
);

export default MainPage;