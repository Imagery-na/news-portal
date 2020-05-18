import React, { Component } from 'react';

import { apiUrl, apiRoutes } from '../../apiConfig';

class NewsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            author: '',
            text: '',
            messages: '',
            error: '',
        }
    }

    onChangeHandler = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({[name]: value});
    }

    onSubmitHandler = (event) => {
        event.preventDefault(); //прерывает действие по умолчанию

        const { title, author, text } = this.state;
        const { addNewsCallback } = this.props; //получает метод добавления статей в список предка

        if ([title, author, text].some(el => !el.length)) { 
            return this.setState({error: 'Пожалуйста, заполните все поля', messages: ''});
        }

        const requestUrl = apiUrl + apiRoutes.news + `?title=${title}&author=${author}&text=${text}`; // создаёт URL для обращения к серверу, куда помещает данные в query-параметры

        fetch(requestUrl, {method: 'POST'}) //делает запрос к серверу с методом POST
            .then(res => {
                const { status } = res;

                if (status < 200 || status > 299) {
                    throw new Error(`Ошибка при добавлении новости. Код ${status}`);
                }
                
                return res.json();
            })
            .then(addedNews => {
                addNewsCallback(addedNews);  // вызывается метод предка для добавления новой статьи в локальный стейт
                this.setState({ // очищает данные формы из своего стейта и помещает туда сообщение об успешном добавлении
                    title: '',
                    author: '',
                    text: '',
                    messages: 'Новость успешно добавлена!',
                    error: '',
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({error: error.message, messages: ''});
            });
    }

    render() {
        const { title, author, text, messages, error } = this.state;

        return (
            <main>
            <form onSubmit={this.onSubmitHandler}>

                {!messages ? null : ( //если есть сообщение, выводит его
                    <p className="App-messages-box">
                        {messages}
                    </p>
                )}

                {!error ? null : (
                    <p className="App-error-box">
                        Ошибка! {error}
                    </p>
                )}
                

                <label className="App-label">
                    Заголовок:
                    <input 
                        className="App-input-field"
                        name="title" 
                        placeholder="Заголовок" 
                        onChange={this.onChangeHandler}
                        value={title}
                    />
                </label>
                
                <label className="App-label">
                    Автор:
                    <input 
                    className="App-input-field"
                    name="author"
                    placeholder="Автор"
                    onChange={this.onChangeHandler}
                    value={author}
                    />
                </label>
                
                <label className="App-label">
                    Текст:
                    <textarea 
                        className="App-input-field"
                        name="text"
                        placeholder="Текст"
                        onChange={this.onChangeHandler}
                        value={text}
                    />
                </label>
                
                <button type="submit">
                    Добавить
                </button>
            </form>
            </main>
        );
    }
}

export default NewsAdd;