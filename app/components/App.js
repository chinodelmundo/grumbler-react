import React from 'react';
import AppStore from '../stores/AppStore'
import AppActions from '../actions/AppActions';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = AppStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AppStore.listen(this.onChange);
    AppActions.getUser();
  }

  componentWillUnmount() {
    AppStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
  	const auth = {
  		authenticated: this.state.authenticated,
  		username: this.state.username,
      imgLink: this.state.imgLink,
  	}

  	const children = React.Children.map(this.props.children,
     	(child) => React.cloneElement(child, {
       		auth: auth
     	})
    );

    return (
      <div>
  		<Navbar 
        history={this.props.history} 
        auth={auth} />
        {children}
      </div>
    );
  }
}

export default App;