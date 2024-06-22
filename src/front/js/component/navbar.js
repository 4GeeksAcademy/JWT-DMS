import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Compartments.com</span>
				</Link>
				{
					!store.token && <>
						<div className="ml-auto">
							<Link to="/signin">
								<button className="btn btn-primary">Sign In</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/signup">
								<button className="btn btn-primary">Sign Up</button>
							</Link>
						</div>
					</> || <div className="ml-auto">
						<Link to="/signin">
							<button className="btn btn-primary" onClick={() => actions.logOut()} >Logout</button>
						</Link>
					</div>
				}

			</div>
		</nav>
	);
};
