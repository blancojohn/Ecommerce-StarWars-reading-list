import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import CardPeople from "../component/CardPeople.jsx";
import CardPlanet from "../component/CardPlanet.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="text-center mt-5">
				<CardPeople />
				<CardPlanet />
			</div>
		</>
	);
};
