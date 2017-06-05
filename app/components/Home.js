import React from 'react';
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
    socket.on('newGrumble', (newGrubmleUsername) => {
        let username = this.props.auth.authenticated? this.props.auth.username : this.state.username;
        if(newGrubmleUsername !== username){
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
    return (
      <div className="main-content">
        <GrumbleForm 
          auth = {this.props.auth}
          username={this.state.username} 
          handleUsernameChange={this.handleChangeUsername}/>
        <GrumbleStream
          auth={this.props.auth}
          newGrumbleCount={this.state.newGrumbleCount} 
          handleNewGrumbleClick={this.handleNewGrumbleClick}/>
        <ChatPanel 
          auth={this.props.auth} />
      </div>
    );
  }
}

export default Home;