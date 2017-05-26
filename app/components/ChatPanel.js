import React from 'react';
import ChatPanelStore from '../stores/ChatPanelStore'
import ChatPanelActions from '../actions/ChatPanelActions';

class ChatPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = ChatPanelStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        ChatPanelStore.listen(this.onChange);

        let socket = io('');
        let ioChatConnect = io('/chat');

        ioChatConnect.on('onlineUsers', (data) => {
          ChatPanelActions.updateOnlineUsers(data);
        });

        socket.on('startMessages', (messages) => {
            if(this.state.messages.length === 0)
                ChatPanelActions.updateMessages(messages);
        });

        socket.on('chatMessage', (message) => {
            ChatPanelActions.addMessage(message);
        });
    }

    componentWillUnmount() {
        ChatPanelStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        let message = {
            username: this.props.username ? this.props.username : this.state.username.trim(),
            text: this.state.text.trim()
        };

        if (message.username && message.text) {
            let socket = io.connect();
            socket.emit('chatMessage', message);
        }

        ChatPanelActions.clearText();
    }

    render() {
        var messages = this.state.messages.map((message, index) => {
            return (
                <div key={index} className="message">
                    <div className="chat-username">{message.username}:</div>
                    <div className="chat-text">{message.text}</div>
                </div>
            );
        });

        return (
            <div className="chat-panel">
                <div className="panel-title">Chat</div>
                <div id="users-count"> {this.state.onlineUsers} users are here</div>
                <div id="chat-content">
                    {messages}
                </div>
                <div className="new-message">
                    <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked message-form">
                        {
                            !this.props.authenticated &&
                            <input id="new-message-username" value={this.state.username} onChange={ChatPanelActions.updateUsername} placeholder="Username" required/>
                        }

                        <textarea id="new-message-text" value={this.state.text} onChange={ChatPanelActions.updateText} className="input-grumble-text" rows="2" placeholder="Message" reqired />
                        <button id="sent-message-btn" type="submit" className="pure-button pure-button-primary">Send</button>
                    </form>
                </div>
            </div>
        ); 
    }
}

export default ChatPanel;