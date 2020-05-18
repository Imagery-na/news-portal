import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'; //роутинг
import createHistory from 'history/createHashHistory'

import { apiUrl, apiRoutes } from './apiConfig'; //работа с api

import MainPage from './components/MainPage';
import NewsList from './components/NewsList';
import NewsPage from './components/NewsPage';
import NewsAdd from './components/NewsAdd';
import UsersList from './components/UsersList';

import './App.css';
import logoNews from './images/logo-news2.png';

const history = createHistory();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: null,
      usersList: null,
    };
  }

  loadNews = () => { //делает запрос к API и сохраняет новости в this.state.newsList.
    fetch(apiUrl + apiRoutes.news)
      .then(res => res.json())
      .then(res => this.setState({newsList: res}))
      .catch(error => {
        alert('Ошибка при получении списка новостей');
        console.error(error);
      });
  }

  loadUsers = () => {
    fetch(apiUrl + apiRoutes.users)
      .then(res => res.json())
      .then(res => this.setState({usersList: res}))
      .catch(error => {
        alert('Ошибка при получении списка пользователей');
        console.error(error);
      });
  }

  renderSingleNews = ({ match }) => { //получает поле match, где находится id просматриваемой новости, и возвращает компонент NewsPage, куда передаёт данные этой новости
    const { id: currentNewsId } = match.params;

    if (!this.state.newsList) {
      return <p>Новости ещё не загрузились</p>;
    }

    const newsData = this.state.newsList.find(
        news => Number(news.id) === Number(currentNewsId)
    );
    
    return <NewsPage newsData={newsData} />
  }

  addNewsCallback = (newNews) => { //чтобы не делать дополнительный запрос на сервер, этот метод добавит в хранилище добавленную новость из компонента NewsAdd
    const { newsList } = this.state;
    this.setState({newsList: [newNews, ...newsList]});
  }

  deleteNewsHandler = (id) => () => {
    const requestUrl = apiUrl + apiRoutes.news + `?id=${id}`;
    const { newsList } = this.state;
    console.log('deleteNewsHandler requestUrl', requestUrl);
    
    fetch(requestUrl, {method: 'DELETE'})
      .then(res => {
        const { status } = res;

        if (status < 200 || status > 299) {
          throw new Error(`Ошибка при удалении! Код: ${status}`);
        }

        const cleanNewsList = newsList.filter(news => news.id !== id);
        this.setState({newsList: cleanNewsList});

        alert(`Статья с id: ${id} удалена!`);
      })
      .catch(error => {
        console.log('catch error');
        console.error(error);
      });
  }

  render() {
    const { newsList, usersList } = this.state;

    return (
      <div>
        <header className="header">
          <img src={logoNews} className="header__logo" alt="news" title="news" />
          <h1 className="header__title">News portal by <a href="https://imagery-na.github.io"> Imageryna</a> </h1>
        </header>

        <Router history={history}>
          <body>
            
            <nav className="menu">
              <Link className="menu__link" to='/'>Главная</Link>
              <Link className="menu__link" to={apiRoutes.users}>Пользователи</Link>
              <Link className="menu__link" to={apiRoutes.news}>Новости</Link>
            </nav>
            <Switch>
            
              <Route exact path='/'>
                <MainPage />
              </Route>

              <Route exact path={apiRoutes.users}>
                <UsersList loadUsers={this.loadUsers} usersList={usersList} />
              </Route>
            
              <Route exact path={apiRoutes.news}>
                <NewsList loadNews={this.loadNews} deleteNewsHandler={this.deleteNewsHandler} newsList={newsList} />
              </Route>
            
              <Route exact path={apiRoutes.news + '/add'}>
                <NewsAdd addNewsCallback={this.addNewsCallback} />
              </Route>
            
              <Route exact path={apiRoutes.news + '/:id'} component={this.renderSingleNews} /> 
              
            </Switch>

          </body>
        </Router>

      </div>
    );
  }
}

export default App;
