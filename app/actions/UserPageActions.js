import alt from '../alt';

class UserPageActions {
  constructor() {
    this.generateActions(
        'getUserInfoSuccess',
        'getUserGrumblesSuccess',
        'updateCommentFormUsername',
        'updateCommentFormText',
        'addCommentSuccess',
        'hideComments'
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

  getUserGrumbles(username) {
      $.ajax({ url: '/api/grumbles/' + username })
      .done(data => {
        this.actions.getUserGrumblesSuccess(data);
      })
      .fail(data => {
      });
  }

  addComment(grumbleId, username, text, authenticated) {
      $.ajax({
          type: 'PUT',
          url: '/api/grumble/comment',
          data: { 
                  grumbleId: grumbleId,
                  username: username, 
                  text: text,
                  authenticated: authenticated
              }
      })
      .done(() => {
        this.actions.addCommentSuccess();
      })
      .fail(() => {
      });
  }
}

export default alt.createActions(UserPageActions);