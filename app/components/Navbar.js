import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <a className="index-link" href="/"> Grumbler </a>
        <a className="login-link" href="/login"> Login </a>
      </nav>
    );
  }
}

export default Navbar;