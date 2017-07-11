import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import ReactTooltip from 'react-tooltip'
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
        GrumbleStreamActions.getGrumbles(this.props.pageOwner);
        GrumbleStreamActions.setPageOwner(this.props.pageOwner);
        this.comment = [];
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
            text: event.target.value
        };

        GrumbleStreamActions.updateCommentFormText(data);
    }

    handleCommentFormSubmit(event, index, grumbleId){
        event.preventDefault();

        var newComment = {
            username: this.props.auth.authenticated ? this.props.auth.username : this.state.commentForms[index].username.trim(),
            text: this.state.commentForms[index].text.trim(),
            authenticated: this.props.auth.authenticated,
            imgLink: this.props.auth.imgLink ? this.props.auth.imgLink : ''
        };

        if (newComment.username && newComment.text) {
            let data = {
                index: index,
                text: ''
            };

            GrumbleStreamActions.updateCommentFormText(data);
            GrumbleStreamActions.addComment(grumbleId, newComment);

            alertify.set('notifier','position', 'bottom-left');
            alertify.message('Comment submitted! Please wait.');
        }
    }

    handleHideCommentsClick(event, index){
        event.preventDefault();
        GrumbleStreamActions.hideComments(index);
        const node = ReactDOM.findDOMNode(this.comment[index]);
        $(node).toggle(200);
    }

    handleEmpathizeClick(index, grumbleId, empathized){
        if(this.props.auth.authenticated){
            GrumbleStreamActions.toggleEmpathize(index, this.props.auth.username, grumbleId, empathized);
        }else{
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Must be logged-in to empathize.');
        }
    }

    handleShowEmpathizers(users){
        let title = users.length + ((users.length == 1) ? ' user': ' users') + ' empathized with this grumble.';

        let userLinks = '';
        users.map((user)=>{
            userLinks = userLinks.concat("<p><a href='/user/" + user + "'>" + user + "</a><p>")
        });

        alertify.alert(title, userLinks);
    }

    render() {
        var grumbles = this.state.grumbles.map((grumble, index) => {
            
            var comments = grumble.comments.map((comment, index) => {
                let commentUser;

                if(comment.authenticated){
                    commentUser = (
                            <div className="comment-user">
                                {
                                    !comment.imgLink &&
                                    <img className="user-icon" src="/img/user-icon.png" />
                                }
                                {
                                    comment.imgLink &&
                                    <img className="user-icon" src={comment.imgLink} />
                                }
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
                        {
                            !grumble.imgLink &&
                            <img className="user-icon" src="/img/user-icon.png" />
                        }
                        {
                            grumble.imgLink &&
                            <img className="user-icon" src={grumble.imgLink} />
                        }
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

             let tooltip;
             if(grumble.likes.length > 0){
                let usersList = '';

                switch(grumble.likes.length) {
                    case 1:
                        usersList = grumble.likes.toString();
                        break;
                    case 2:
                    case 3:
                        usersList = grumble.likes.slice(0, grumble.likes.length - 1).join(', ');
                        usersList = usersList.concat(' and ' + grumble.likes[grumble.likes.length - 1]);
                        break;
                    default:
                        usersList = grumble.likes.slice(0,3).join(', ');
                        usersList = usersList.concat(' and ' + (grumble.likes.length - 3));
                        usersList = grumble.likes.length - 3 == 1 ? usersList + ' other': usersList + ' others';
                }

                tooltip = (
                            <ReactTooltip id={grumble._id} place="bottom">
                                {usersList + ' empathized with this grumble.'}
                            </ReactTooltip>
                        );
             }else{
                tooltip = (
                            <ReactTooltip id={grumble._id} place="bottom">
                                Be the first to empathize!
                            </ReactTooltip>
                        );
             }

             let empathized = false;
             if(this.props.auth.authenticated && grumble.likes.includes(this.props.auth.username)){
                empathized = true;
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
                            <a role="button" className="empathize-btn" onClick={() => this.handleEmpathizeClick(index, grumble._id, empathized)} data-tip data-for={grumble._id}> 
                                { empathized ? 'Unempathize' : 'Empathize' }
                            </a>
                            {
                                grumble.likes.length > 0 && 
                                <a role="button" className="empathize-num-btn" onClick={() => this.handleShowEmpathizers(grumble.likes)} data-tip data-for={grumble._id}>({grumble.likes.length})</a>
                            }
                            <a role="button" className="toggle-comments-btn" onClick={(event) => this.handleHideCommentsClick(event, index)} > 
                                {this.state.hideComments[index] ? 'Show ' : 'Hide'} comments {comments.length > 0 && '(' + comments.length + ')'} 
                            </a>
                        </div>
                        {tooltip}
                    </div>
                    <div className="comments-panel" ref={(el) => { this.comment[index] = el; }}>
                        {comments}
                        <div className="new-comment">
                            <div className="space"></div>
                            <CommentForm 
                                authenticated={this.props.auth.authenticated}
                                values={this.state.commentForms[index]} 
                                onChangeUsername={(event) => this.handleCommentFormUsernameChange(index, event)}  
                                onChangeText={(event) => this.handleCommentFormTextChange(index, event)} 
                                handleSubmit={(event) => this.handleCommentFormSubmit(event, index, grumble._id)} 
                            />
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="grumble-stream">
                <div className="panel-title">
                    {this.props.pageOwner? this.props.pageOwner + "'s ": "" }
                    Grumble Stream
                    <button className="panel-icon-right" title="Refresh Grumble Stream"
                        onClick={() => GrumbleStreamActions.updateGrumbles(this.state.grumbles.length, this.state.pageOwner)} >
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                </div>
                {   
                    this.props.newGrumbleCount > 0 &&
                    <div id="update-stream">
                        <a href="#" onClick={() => {this.props.handleNewGrumbleClick(); GrumbleStreamActions.getGrumbles();}}>{this.props.newGrumbleCount} New Grumbles. Click to Show.</a>
                    </div>
                }
                <div className="grumble-panel">
                    {grumbles}
                    {
                        !this.props.pageOwner&&
                        <div id="load-more-grumbles">
                            <a href="#" onClick={() => GrumbleStreamActions.updateGrumbles(this.state.grumbles.length + 10, this.state.pageOwner)}>Load more Grumbles</a>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default GrumbleStream;