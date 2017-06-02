import alt from '../alt';

class UserPageActions {
  constructor() {
    this.generateActions(
        'getUserInfoSuccess'
    );
  }

  getUserInfo(username) {
      $.ajax({ url: '/api/user/' + username })
      .done(data => {
        this.actions.getUserInfoSuccess(data[0]);
      })
      .fail(data => {
      });
  }
}

export default alt.createActions(UserPageActions);