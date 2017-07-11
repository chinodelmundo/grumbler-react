import alt from '../alt';

class AppActions {
  	constructor() {
    	this.generateActions(
    		'getUserSuccess'
    	);
  	}

  	getUser() {
	    $.ajax({ url: '/checkAuth' })
      	.done(user => {
          if(user)
        	 this.actions.getUserSuccess(user);
      	})
      	.fail(() => {
      	});
	}
}

export default alt.createActions(AppActions);