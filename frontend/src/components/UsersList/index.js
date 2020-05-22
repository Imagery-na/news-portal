import React, { Component } from 'react';
import UserCard from '../UserCard';

class UsersList extends Component {

    componentDidMount() {
        if (!this.props.usersList) {
            this.props.loadUsers();
        }
    }

    render() {
        const { usersList, renderNewsOfAuthor } = this.props;
        return (
        <main className="user-page">
            {!usersList ? null : usersList.map(user => (
            <UserCard key={user.id} renderNewsOfAuthor={renderNewsOfAuthor}{...user}/>))}
        </main>
        )
    }
}

export default UsersList;