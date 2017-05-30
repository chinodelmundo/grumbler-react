import alt from '../alt';
import ChatPageActions from '../actions/ChatPageActions';

class ChatPageStore {
  constructor() {
    this.bindActions(ChatPageActions);
  }
}

export default alt.createStore(ChatPageStore);