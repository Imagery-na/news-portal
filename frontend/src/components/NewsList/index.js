import React, { Component } from 'react';
import NewsCard from '../NewsCard';
import { Link } from 'react-router-dom';
import { apiRoutes } from '../../apiConfig';
import addPict from '../../images/add.png';

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
                    <div className="news-list__top">
                        <h3>Все новости:</h3>
                        <Link className="news-list__add-btn" to={apiRoutes.news + '/add'}>
                        </Link>
                    </div>
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
                    <div className="news-list__top">
                        <h3>Статьи автора {author}</h3>
                        <Link className="App-btn" to={apiRoutes.news}>
                        Посмотреть все новости
                        </Link>
                    </div>
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