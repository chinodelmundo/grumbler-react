import alt from '../alt';
import imgur from 'imgur';

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

    updateProfilePicture(username, file) {
        let data = new FormData();
        data.append('file', file[0]);
        data.append('username', username);

        $.ajax({
            type: 'POST',
            url: '/api/user/picture',
            data: data,
            processData: false,
            contentType: false
        })
        .done(() => {
            this.actions.actionSuccess();
        })
        .fail(() => {
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Error on updating profice picture.');
        });
    }
}

export default alt.createActions(UserPageActions);