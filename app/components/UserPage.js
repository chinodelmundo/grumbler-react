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

    handleDescSubmit(event){
        event.preventDefault();

        var username = this.props.auth.username;
        var description = this.state.description;

        if (username && description) {
            UserPageActions.updateUserDescription(username, description);

            alertify.set('notifier','position', 'bottom-left');
            alertify.message('Updating description. Please wait.');
        }
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
                        <div className="user-description">
                            <div className="user-desc-header">
                                Description 
                                
                                {
                                    (this.props.auth.username == this.props.params.username) &&
                                    <i className="fa fa-pencil-square-o action-icon" role="button" title="Edit Description" aria-hidden="true" 
                                        onClick={UserPageActions.showDescTextarea}></i>
                                }
                            </div>
                            <div className="user-desc-body">
                                {
                                    this.state.showDescTextArea &&
                                    <div>
                                        <form className="pure-form" onSubmit={this.handleDescSubmit.bind(this)}>
                                            <textarea value={this.state.description} onChange={UserPageActions.updateDescription} className="input-desc-text" rows="4" placeholder="Description" required />
                                            <button type="submit" className="pure-button pure-button-primary save-desc-btn">Save</button>
                                        </form>
                                    </div>
                                }
                                {
                                    !this.state.showDescTextArea &&
                                    <div>
                                        {this.state.pageOwner.description ? this.state.pageOwner.description : 'No description has been given.'}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <GrumbleStream 
                    auth={this.props.auth} 
                    pageOwner={this.props.params.username}/>
                <ChatPanel 
                    auth={this.props.auth} />
            </div>
        );
    }
}

export default UserPage;