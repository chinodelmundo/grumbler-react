import alt from '../alt';

class GrumbleStreamActions {
    constructor() {
        this.generateActions(
          'getGrumblesSuccess',
          'getGrumblesFail',
          'updateCommentFormUsername',
          'updateCommentFormText',
          'incrementNewGrumbleCount',
          'hideComments'
        );
    }

    getGrumbles() {
      $.ajax({ url: '/api/grumbles' })
      .done(data => {
        this.actions.getGrumblesSuccess(data);
      })
      .fail(data => {
      });
    }

    updateGrumbles(count) {
        $.ajax({
            type: 'POST',
            url: '/api/grumbles/more',
            data: { 
                    count: count
                }
        })
          .done(data => {
            this.actions.getGrumblesSuccess(data);
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
            this.actions.getGrumbles();
        })
        .fail(() => {
        });
    }

    toggleEmpathize(index, username, grumbleId){
      $.ajax({
          type: 'PUT',
          url: '/api/grumble/empathize',
          data: { 
                  grumbleId: grumbleId,
                  username: username
              }
      })
      .done(() => {
          this.actions.getGrumbles();
      })
      .fail(() => {
      });
    }
}

export default alt.createActions(GrumbleStreamActions);