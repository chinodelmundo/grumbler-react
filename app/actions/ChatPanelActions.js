import alt from '../alt';

class ChatPanelActions {
  constructor() {
    this.generateActions(
      'updateUsername',
      'updateText',
      'updateOnlineUsers',
      'updateMessages',
      'addMessage',
      'clearText'
    );
  }
}

export default alt.createActions(ChatPanelActions);