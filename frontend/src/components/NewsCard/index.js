import React from 'react';
import { Link } from 'react-router-dom';

import { apiRoutes } from '../../apiConfig';

const NewsCard = (props) => (
    <div className="news-card">
      <div className="news-card__info">
        <p>{props.date}</p>
        <h3>
          <Link className="App-link" to={apiRoutes.news + '/' + props.id}>{props.title}</Link>
        </h3>
        <h5>Автор: {props.author}</h5>
        <div className="App-delete-btn" onClick={props.deleteNewsHandler(props.id)}>
          Удалить
        </div>
      </div>
      <img src={props.picture} alt="illustration" className="news-card__picture"/>
    </div>
);

export default NewsCard;