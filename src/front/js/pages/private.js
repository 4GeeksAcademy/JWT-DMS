// import React, { useEffect, useContext } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";

// const Private = () => {
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const authenticate = async () => {
//             console.log("Start of authentication")
//             const isAuthenticated = await actions.authenticateUser();
//             console.log("Authentication Status", isAuthenticated)
//             if (!isAuthenticated) {
//                 navigate("/login");
//             }
//         };

//         const timeoutId = setTimeout(() => {
//             authenticate();
//         }, 500);

//         return () => clearTimeout(timeoutId);
//     }, [actions, navigate]);

//     return (
//         <div className="container text-center">
//             <h1>Hello!</h1>
//             {/* {store.user ? (
//                 <div>
//                     <h2>Email: {store.user.email}</h2>
//                 </div>
//             ) : (
//                 <p>Redirecting to login...</p>
//             )} */}
//         </div>
//     );
// };

// export default Private;

import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	console.log("useNavigate hook:", useNavigate);
	console.log("navigate function:", navigate);

	const isAuthenticated = () => {
		const token = sessionStorage.getItem('token');
		return token != null;
	}

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate('/signin')
		}
	}, [navigate])


	return (
		<div className="container">
			This is a private message
			<Link to="/Home">
				<button className="btn btn-primary">Back To Home</button>
			</Link>
		</div>
	);
};