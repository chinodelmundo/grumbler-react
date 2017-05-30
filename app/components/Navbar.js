import React from 'react';
import {Link} from 'react-router';

function Navbar(props) {
  	if(props.auth.authenticated){
	    return (
	      	<nav>
	        	<a className="index-link" href={"/"}> Grumbler </a>
	        	<ul className="nav navbar-nav navbar-right">
		            <li className="dropdown">
		                <a href="#" className="dropdown-toggle" data-toggle="dropdown">  
		                	{props.auth.username} 
		                	<span className="caret"></span>
		                </a>
		                <ul className="dropdown-menu" role="menu">
		                    <li><a className="login-link" href={"/user/" + props.auth.username}> My Profile </a></li>
		                    <li><a className="dropdown-link" href="/logout"> Log out </a></li>
		                </ul>
		            </li>
		        </ul>
	      	</nav>
	    );
  	}else{
	    return (
	      	<nav>
	        	<a className="index-link" href={"/"}> Grumbler </a>
	        	<a className="login-link" href={"/login"}> Log in </a>
	      	</nav>
	    );
  	}
}

export default Navbar;