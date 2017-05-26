import React from 'react';
import {Link} from 'react-router';
import GrumbleStreamStore from '../stores/GrumbleStreamStore'
import GrumbleStreamActions from '../actions/GrumbleStreamActions';
import CommentForm from './CommentForm';

class GrumbleStream extends React.Component {
    constructor(props) {
        super(props);
        this.state = GrumbleStreamStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        GrumbleStreamStore.listen(this.onChange);
        GrumbleStreamActions.getGrumbles();
    }

    componentWillUnmount() {
        GrumbleStreamStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleCommentFormUsernameChange(index, event) {
        let data = {
            index: index,
            event: event
        };

        GrumbleStreamActions.updateCommentFormUsername(data);
    }

    handleCommentFormTextChange(index, event) {
        let data = {
            index: index,
            event: event
        };

        GrumbleStreamActions.updateCommentFormText(data);
    }

    handleCommentFormSubmit(event, index, grumbleId){
        event.preventDefault();

        var username = this.props.auth ? this.props.auth.username : this.state.commentForms[index].username.trim();
        var text = this.state.commentForms[index].text.trim();
        var authenticated = this.props.auth ? this.props.auth.authenticated : false;

        if (username && text) {
            GrumbleStreamActions.addComment(grumbleId, username, text, authenticated);
        }
    }

    handleHideCommentsClick(event, index){
        event.preventDefault();
        GrumbleStreamActions.hideComments(index);
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
                                    <Link to={"/user/" + comment.username}> {comment.username} </Link>
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
                            <Link to={'/user/' + grumble.username}> {grumble.username} </Link>
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
            <div className="grumble-stream">
                <div className="panel-title">
                    Grumble Stream
                </div>
                {   
                    this.props.newGrumbleCount > 0 &&
                    <div id="update-stream">
                        <a href="#" onClick={() => {this.props.handleNewGrumbleClick(); GrumbleStreamActions.getGrumbles();}}>{this.props.newGrumbleCount} New Grumbles. Click to Show.</a>
                    </div>
                }
                <div className="grumble-panel">
                    {grumbles}
                    <div id="load-more-grumbles">
                        <a href="#" onClick={() => GrumbleStreamActions.updateGrumbles(this.state.grumbles.length + 10)}>Load more Grumbles</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default GrumbleStream;