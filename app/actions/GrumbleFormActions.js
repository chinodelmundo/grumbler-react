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

    addGrumble(username, text, annoyanceLevel, authenticated) {
        $.ajax({
            type: 'POST',
            url: '/api/grumble',
            data: { 
                    username: username, 
                    text: text, 
                    annoyanceLevel: annoyanceLevel,
                    authenticated: authenticated
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