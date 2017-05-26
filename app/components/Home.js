import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import GrumbleForm from './GrumbleForm';
import GrumbleStream from './GrumbleStream';
import ChatPanel from './ChatPanel';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);

    let socket = io();
    socket.on('newGrumble', (username) => {
        if(username !== this.state.username){
          HomeActions.updateNewGrumbleCount(++this.state.newGrumbleCount);
        }
    });
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleChangeUsername(event){
    HomeActions.updateUsername(event.target.value);
  }

  handleNewGrumbleClick(){
    HomeActions.updateNewGrumbleCount(0);
  }

  render() {
    let loggedIn = this.props.auth.authenticated;

    if(loggedIn){
      return (
        <div className="main-content">
          <GrumbleForm 
            authenticated={this.props.auth.authenticated}
            username={this.props.auth.username} />
          <GrumbleStream 
            auth={this.props.auth}
            username={this.state.username}
            newGrumbleCount={this.state.newGrumbleCount} 
            handleNewGrumbleClick={this.handleNewGrumbleClick}/>
          <ChatPanel 
            authenticated={true} 
            username={this.props.auth.username} />
        </div>
      );
    }else{
      return (
        <div className="main-content">
          <GrumbleForm 
            authenticated = {false}
            username={this.state.username} 
            handleUsernameChange={this.handleChangeUsername}/>
          <GrumbleStream 
            username={this.state.username} 
            newGrumbleCount={this.state.newGrumbleCount} 
            handleNewGrumbleClick={this.handleNewGrumbleClick}/>
          <ChatPanel 
            authenticated={false} />
        </div>
      );
    }
  }
}

export default Home;