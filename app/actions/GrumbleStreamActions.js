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
            console.log('fail');
          });
    }

    updateGrumbles(count) {
      console.log('get.. ' + count);
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
            console.log('fail');
          });
    }

    addComment(grumbleId, username, text) {
        $.ajax({
            type: 'PUT',
            url: '/api/grumble/comment',
            data: { 
                    grumbleId: grumbleId,
                    username: username, 
                    text: text
                }
        })
        .done(() => {
            console.log('success');
            this.actions.getGrumbles();
        })
        .fail(() => {
        });
    }
}

export default alt.createActions(GrumbleStreamActions);