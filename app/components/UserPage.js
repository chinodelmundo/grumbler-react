import React from 'react';
import UserPageStore from '../stores/UserPageStore'
import UserPageActions from '../actions/UserPageActions';
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
        UserPageActions.getUserGrumbles(this.props.params.username);

        let socket = io();
    }

    componentWillUnmount() {
        UserPageStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleCommentFormUsernameChange(index, event) {
        let data = {
            index: index,
            event: event
        };

        UserPageActions.updateCommentFormUsername(data);
    }

    handleCommentFormTextChange(index, event) {
        let data = {
            index: index,
            text: event.target.value
        };

        UserPageActions.updateCommentFormText(data);
    }

    handleCommentFormSubmit(event, index, grumbleId){
            console.log('submit?')
        event.preventDefault();
        console.log(this.props.auth)
        var username = this.props.auth.authenticated ? this.props.auth.username : this.state.commentForms[index].username.trim();
        var text = this.state.commentForms[index].text.trim();
        var authenticated = this.props.auth ? this.props.auth.authenticated : false;

        if (username && text) {
            let data = {
                index: index,
                text: ''
            };

            UserPageActions.updateCommentFormText(data);
            UserPageActions.addComment(grumbleId, username, text, authenticated);
        }
    }

    handleHideCommentsClick(event, index){
        event.preventDefault();
        UserPageActions.hideComments(index);
    }

    render() {
        var grumbles = this.state.grumbles.map((grumble, index) => {
            
            var comments = grumble.comments.map((comment, index) => {
                let commentUser;

                if(comment.authenticated){
                    commentUser = (
                            <div className="comment-user">
                                <img className="user-icon" src="/img/user-icon.png" />
                                <div className="user-name">
                                    <a href={"/user/" + comment.username}> {comment.username} </a>
                                </div>
                            </div>
                        );
                }else{
                    commentUser = (
                            <div className="comment-user">
                                <img className="user-icon" src="/img/user-icon.png" />
                                <div className="user-name"> {comment.username} </div>
                                <div className="guest-text">Guest User</div>
                            </div>
                        );
                }
                return (
                    <div key={index} className="comment-container">
                        <div className="space"></div>
                        <div className="comment">
                            {commentUser}
                            <div className="comment-content">{comment.text}</div>
                            <div className="comment-footer">
                                <div className="comment-datetime" title={comment.date.num}>
                                    {comment.date.relative}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });

            let grumbleUser;
             if(grumble.authenticated){
                grumbleUser = (
                    <div className="grumble-user">
                        <img className="user-icon" src="/img/user-icon.png" />
                        <div className="user-name">
                            <a href={'/user/' + grumble.username}> {grumble.username} </a>
                        </div>      
                    </div>
                );
             }else{
                grumbleUser = (
                    <div className="grumble-user">
                        <img className="user-icon" src="/img/user-icon.png" />
                        <div className="user-name"> {grumble.username} </div>
                        <div className="guest-text">Guest User</div>         
                    </div>
                );
             }
                
            return (
                <div key={grumble._id} className="grumble">
                    
                    {grumbleUser}

                    <div className="grumble-content">{grumble.text}</div>
                    <div className="grumble-footer">
                        <div className={"grumble-level grumble-level-" + grumble.annoyanceLevel.num}>
                            {grumble.annoyanceLevel.text}
                        </div>
                        <div className="grumble-datetime" title={grumble.date.text}>
                            {grumble.date.relative}
                        </div>
                    </div>
                    <div className="grumble-actions">
                        <div className="space"></div>
                        <div className="action-buttons">
                            <a href="#" className="empathize-btn"> Empathize </a>
                            <a href="#" className="toggle-comments-btn" onClick={(event) => this.handleHideCommentsClick(event, index)} > {this.state.hideComments[index] ? 'Show ' : 'Hide'} comments 
                            </a>
                        </div>
                    </div>
                    { 
                        !this.state.hideComments[index] &&
                        <div className="comments-panel">
                            {comments}
                            <div className="new-comment">
                                <div className="space"></div>
                                <CommentForm 
                                    authenticated={this.props.auth ? this.props.auth.authenticated : false}
                                    values={this.state.commentForms[index]} 
                                    onChangeUsername={(event) => this.handleCommentFormUsernameChange(index, event)}  
                                    onChangeText={(event) => this.handleCommentFormTextChange(index, event)} 
                                    handleSubmit={(event) => this.handleCommentFormSubmit(event, index, grumble._id)} 
                                />
                            </div>
                        </div>
                    }
                </div>
            );
        });

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

                                <tr>
                                    <td className="row-name">Grumbles:</td>
                                    <td>{this.state.grumbles.length}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grumble-stream">
                    <div className="panel-title">
                        {this.state.pageOwner.username}'s Grumble Stream
                        <button className="panel-icon-right" title="Refressh Grumble Stream"
                            onClick={() => UserPageActions.getUserGrumbles(this.props.params.username)} >
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="grumble-panel">
                        {grumbles}
                    </div>
                </div>
                <ChatPanel 
                    authenticated={this.props.auth.authenticated} 
                    username={this.props.auth.username} />
            </div>
        );
    }
}

export default UserPage;