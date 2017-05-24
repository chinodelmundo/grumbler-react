import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'updateUsername',
      'updatePassword'
    );
  }
}

export default alt.createActions(LoginActions);