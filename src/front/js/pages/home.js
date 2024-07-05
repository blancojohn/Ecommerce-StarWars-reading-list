import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import CardPeople from "../component/CardPeople.jsx";
import CardPlanet from "../component/CardPlanet.jsx";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<>	
			{
				(store.accessToken) &&
					<>
						<div className="ms-5 mt-2">
							<h3>Bienvenido al Universo de Star Wars {store.user.username}</h3>
						</div>
					</>

			}
			<div className="text-center mt-5">
				<CardPeople />
				<CardPlanet />
			</div>
		</>
	);
};
