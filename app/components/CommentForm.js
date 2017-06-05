import React from 'react';

function CommentForm(props) {
	let commentForm;

	if(props.authenticated){
		commentForm = (
	        <form className="pure-form pure-form-stacked comment-form" onSubmit={props.handleSubmit}>
	            <textarea value={props.values.text} onChange={props.onChangeText} className="input-comment-text" rows="2" placeholder="Comment" required />
	            <button type="submit" className="pure-button pure-button-primary">Submit Comment</button>
	        </form>
	    );
	}else{
		commentForm = (
	        <form className="pure-form comment-form-flex" onSubmit={props.handleSubmit}>
	            <div className="comment-form-top">
	                <input className="input-comment-username" value={props.values.username} onChange={props.onChangeUsername} placeholder="Username" required/>
	                <button type="submit" className="pure-button pure-button-primary submit-comment-btn">Submit Comment</button>
	            </div>
	            <textarea value={props.values.text} onChange={props.onChangeText} className="input-comment-text" rows="2" placeholder="Comment" required />
	        </form>
	    );
	}

    return commentForm;
}

export default CommentForm;