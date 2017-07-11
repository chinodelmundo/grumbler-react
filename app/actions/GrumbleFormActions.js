import alt from '../alt';

class GrumbleFormActions {
    constructor() {
        this.generateActions(
            'updateText',
            'updateAnnoyanceLevel',
            'addGrumbleSuccess',
            'clearGrumbleForm'
        );
    }

    addGrumble(newGrumble) {
        $.ajax({
            type: 'POST',
            url: '/api/grumble',
            data: { 
                    username: newGrumble.username, 
                    text: newGrumble.text, 
                    annoyanceLevel: newGrumble.annoyanceLevel,
                    authenticated: newGrumble.authenticated,
                    imgLink: newGrumble.imgLink
                }
        })
        .done(() => {
            this.actions.addGrumbleSuccess();
        })
        .fail(() => {
            alertify.set('notifier','position', 'bottom-left');
            alertify.error('Error on Grumble submission.');
        });
    }
}

export default alt.createActions(GrumbleFormActions);