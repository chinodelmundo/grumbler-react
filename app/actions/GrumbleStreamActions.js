import alt from '../alt';

class GrumbleStreamActions {
    constructor() {
        this.generateActions(
          'getGrumblesSuccess',
          'getGrumblesFail',
          'updateCommentFormUsername',
          'updateCommentFormText',
          'incrementNewGrumbleCount',
          'hideComments',
          'actionSuccess',
          'setPageOwner'
        );
    }

    getGrumbles(username) {
      if(username){
        $.ajax({ url: '/api/grumbles/' + username })
        .done(data => {
          this.actions.getGrumblesSuccess(data);
        })
        .fail(data => {
        });
      }else{
        $.ajax({ url: '/api/grumbles' })
        .done(data => {
          this.actions.getGrumblesSuccess(data);
        })
        .fail(data => {
        });
      }
    }

    updateGrumbles(count, username) {
      $.ajax({
          type: 'POST',
          url: '/api/grumbles/more',
          data: { 
                  count: count,
                  username: username
                }
      })
        .done(data => {
          this.actions.getGrumblesSuccess(data);
        })
        .fail(data => {
        });
    }

    addComment(grumbleId, newComment) {
        $.ajax({
            type: 'PUT',
            url: '/api/grumble/comment',
            data: { 
                    grumbleId: grumbleId,
                    username: newComment.username, 
                    text: newComment.text,
                    authenticated: newComment.authenticated,
                    imgLink: newComment.imgLink
                  }
        })
        .done(() => {
          this.actions.actionSuccess();
        })
        .fail(() => {
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Error on Comment submission.');
        });
    }

    toggleEmpathize(index, username, grumbleId, empathized){
      $.ajax({
          type: 'PUT',
          url: '/api/grumble/empathize',
          data: { 
                  grumbleId: grumbleId,
                  username: username,
                  empathized: empathized
                }
      })
      .done(() => {
        this.actions.actionSuccess();
      })
      .fail(() => {
          alertify.set('notifier','position', 'bottom-left');
          alertify.error('Error on Empathize.');
      });
    }
}

export default alt.createActions(GrumbleStreamActions);