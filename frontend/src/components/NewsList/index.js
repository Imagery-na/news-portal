import React, { Component } from 'react';
import NewsCard from '../NewsCard';
import { Link } from 'react-router-dom';

import { apiRoutes } from '../../apiConfig';

class NewsList extends Component {

    componentDidMount() {
        if (!this.props.newsList) { //был ли передан список с новостями?
            this.props.loadNews();
            console.log('Список с новостями не был передан');
        }
    }

    render() {
        const { newsList, deleteNewsHandler, author } = this.props;
        if (author==null){
            return (
                <main>
                <div>
                    <Link className="App-link" to={apiRoutes.news + '/add'}>
                        Добавить новость
                    </Link>
                    <h3>Список всех новостей:</h3>
                    {!newsList ? null : newsList.map(news => (
                        <NewsCard key={news.id} deleteNewsHandler={deleteNewsHandler} {...news} />
                    ))}
                </div>
                </main>
            ) 
        } else {
            const newsOfAuthor = [];
            for(let news in newsList) {
                newsOfAuthor.push(
                    <NewsCard key={news.id} deleteNewsHandler={deleteNewsHandler} {...news} />
                );
            }
            console.log("newsList "+ newsList);

            return (
                <main>
                <div>
                    <Link className="App-link" to={apiRoutes.news}>
                       Посмотреть все новости
                    </Link>
                    <p>Статьи автора {author}</p>
                    {!newsList ? null : newsList.filter(news => news.author == author).map(newsOfAuthor => (
                        <NewsCard key={newsOfAuthor.id} deleteNewsHandler={deleteNewsHandler} {...newsOfAuthor} />
                    ))}
                </div>
                </main>
            )
        }
        
    }
}

export default NewsList;