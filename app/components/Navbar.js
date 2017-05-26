import React from 'react';
import {Link} from 'react-router';

function Navbar(props) {
  	if(props.auth.authenticated){
	    return (
	      	<nav>
	        	<Link className="index-link" to={"/"}> Grumbler </Link>
	        	<ul className="nav navbar-nav navbar-right">
		            <li className="dropdown">
		                <a href="#" className="dropdown-toggle" data-toggle="dropdown">  
		                	{props.auth.username} 
		                	<span className="caret"></span>
		                </a>
		                <ul className="dropdown-menu" role="menu">
		                    <li><Link className="login-link" to={"/user/" + props.auth.username}> My Profile </Link></li>
		                    <li><a className="dropdown-link" href="/logout"> Log out </a></li>
		                </ul>
		            </li>
		        </ul>
	      	</nav>
	    );
  	}else{
	    return (
	      	<nav>
	        	<Link className="index-link" to={"/"}> Grumbler </Link>
	        	<Link className="login-link" to={"/login"}> Log in </Link>
	      	</nav>
	    );
  	}
}

export default Navbar;