import React from 'react';
import { Link } from 'react-router-dom'; 
import { apiRoutes } from '../../apiConfig'; 

const UserCard = (props) => (
    <div className="user-page__user-card">
      <img className="user-card__photo" src={props.photo} alt="photo"></img>
      <div className="user-card__info">
        <h3>Логин: {props.login}</h3>
        <h4>{props.name}</h4>
        {/* <p>Пароль: {props.password}</p> */}
        <Link className="user-card__btn App-link" to={apiRoutes.newsOfAuthor + '/'+ props.login}>
          {/* <div className="user-card__btn" onClick={props.renderNewsOfAuthor(props.login)}> */}
        Статьи автора
          {/* </div> */}
        </Link>
      </div>
      <div className="user-card__dopinfo">
        {props.info}
      </div>    
    </div>
);

export default UserCard;