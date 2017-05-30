import React from 'react';
import ChatPageStore from '../stores/ChatPageStore'
import ChatPageActions from '../actions/ChatPageActions';
import ChatPanel from './ChatPanel';

class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = ChatPageStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ChatPageStore.listen(this.onChange);
        let socket = io();
    }

    componentWillUnmount() {
        ChatPageStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }
    
    render() {
        return (
	        <div className="main-content">
	            <ChatPanel 
	                authenticated={false} />
	        </div>
	    );
    }
}

export default ChatPage;