import alt from '../alt';

class UserPageActions {
    constructor() {
        this.generateActions(
            'getUserInfoSuccess',
            'showDescTextarea',
            'updateDescription',
            'actionSuccess'
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

    updateUserDescription(username, description) {
        $.ajax({
            type: 'PUT',
            url: '/api/user/description',
            data: { 
                username: username, 
                description: description
            }
        })
        .done(() => {
            this.actions.actionSuccess();
        })
        .fail(() => {
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Error on updating description.');
        });
    }
}

export default alt.createActions(UserPageActions);