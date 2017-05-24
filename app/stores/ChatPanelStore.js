import alt from '../alt';
import ChatPanelActions from '../actions/ChatPanelActions';

class ChatPanelStore {
  constructor() {
    this.bindActions(ChatPanelActions);
    this.username = '';
    this.text = '';
    this.onlineUsers = 0;
    this.messages = [];
  }

  onUpdateUsername(event) {
    this.username = event.target.value.trim();
  }

  onUpdateText(event) {
    this.text = event.target.value;
  }

  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }

  onUpdateMessages(messages) {
    this.messages = messages;
  }

  onAddMessage(message) {
    this.messages.push(message);
  }

  onClearText() {
    this.text = '';
  }
}

export default alt.createStore(ChatPanelStore);