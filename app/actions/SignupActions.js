import alt from '../alt';

class SignupActions {
  constructor() {
    this.generateActions(
      'updateUsername',
      'updatePassword'
    );
  }
}

export default alt.createActions(SignupActions);