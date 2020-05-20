import React from 'react';
import { Router, Route, Link } from 'react-router-dom'; //роутинг
import createHistory from 'history/createHashHistory';

import { apiUrl, apiRoutes } from '../../apiConfig'; //работа с api
import journalist from '../../images/journalist.png';

const UserCard = (props) => (
    <div class="user-page__user-card">
      <img className="user-card__photo" src={props.photo}></img>
      <div className="user-card__info">
        <h3>Логин: {props.login}</h3>
        <h4>{props.name}</h4>
        {/* <p>Пароль: {props.password}</p> */}
        <Link className="user-card__btn" to={apiRoutes.news}>Статьи автора</Link>
      </div>
      <div className="user-card__dopinfo">
        {props.info}
      </div>    
    </div>
);

export default UserCard;