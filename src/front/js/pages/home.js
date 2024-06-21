import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import SignIn from "../component/signIn";
import SignUp from "../component/signUp"
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	useEffect(() => {
		if (!store.token) navigate('/signin')
		console.log("token", store.token)
	}, [])

	return (
		<div className="text-center mt-5">
			<SignUp />
		</div>
	);
};
