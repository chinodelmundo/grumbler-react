import React from 'react';
import UserPageStore from '../stores/UserPageStore'
import UserPageActions from '../actions/UserPageActions';
import GrumbleStream from './GrumbleStream';
import ChatPanel from './ChatPanel';
import CommentForm from './CommentForm';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = UserPageStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        UserPageStore.listen(this.onChange);
        UserPageActions.getUserInfo(this.props.params.username);

        let socket = io();
    }

    componentWillUnmount() {
        UserPageStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        return (
            <div className="main-content">
                <div className="user-info-panel">
                    <div className="panel-title"> User Info </div>
                    <div  className="user-info">
                        <div className="profile-photo-container">
                            <img className="profile-photo" src="/img/user-icon.png" />
                        </div>
                        <table className="pure-table pure-table-horizontal table-info">
                            <tbody>
                                <tr>
                                    <td className="row-name">Username:</td>
                                    <td>{this.state.pageOwner.username}</td>
                                </tr>

                                <tr>
                                    <td className="row-name">Sign Up Date:</td>
                                    <td>{this.state.pageOwner.signUpDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <GrumbleStream 
                    auth={this.props.auth} 
                    pageOwner={this.props.params.username}/>
                <ChatPanel 
                    authenticated={this.props.auth.authenticated} 
                    username={this.props.auth.username} />
            </div>
        );
    }
}

export default UserPage;