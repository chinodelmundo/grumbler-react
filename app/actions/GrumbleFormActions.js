import alt from '../alt';

class GrumbleFormActions {
    constructor() {
        this.generateActions(
            'updateText',
            'updateAnnoyanceLevel',
            'addGrumbleSuccess',
            'addGrumbleFail'
        );
    }

    addGrumble(username, text, annoyanceLevel) {
        $.ajax({
            type: 'POST',
            url: '/api/grumble',
            data: { 
                    username: username, 
                    text: text, 
                    annoyanceLevel: annoyanceLevel 
                }
        })
        .done((data) => {
            this.actions.addGrumbleSuccess(data.message);
        })
        .fail((data) => {
            this.actions.addGrumbleFail(data.message);
        });
    }
}

export default alt.createActions(GrumbleFormActions);