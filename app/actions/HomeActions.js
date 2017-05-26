import alt from '../alt';

class HomeActions {
  	constructor() {
    	this.generateActions(
    		'updateUsername',
    		'updateNewGrumbleCount'
    	);
  	}
}

export default alt.createActions(HomeActions);