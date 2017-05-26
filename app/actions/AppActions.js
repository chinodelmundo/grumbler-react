import alt from '../alt';

class AppActions {
  	constructor() {
    	this.generateActions(
    		'getUserSuccess'
    	);
  	}

  	getUser() {
	    $.ajax({ url: '/checkAuth' })
      	.done(username => {
          if(username)
        	 this.actions.getUserSuccess(username);
      	})
      	.fail(() => {
      	});
	}
}

export default alt.createActions(AppActions);