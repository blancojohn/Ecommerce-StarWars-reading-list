import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GiTrashCan } from "react-icons/gi";


export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				{
					(store.accessToken) ? (
						<>
							<div className="ms-auto">
								<Link to="/private">
									Mi perfil
								</Link>
							</div>
							<div className="dropdown ms-2">
								<button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favorites {store.favorites.length}
								</button>
								<ul className="dropdown-menu">
									{
										store.favorites.length > 0 ?
											store.favorites.map((entity) => {
												return (
													<li key={entity.name} className="d-flex">
														<Link to={`/characters/${entity.characters_id}`} className="dropdown-item" href="#">
															{entity.name}
														</Link>
														<button onClick={() => {
															if (entity.characters_id) {
																actions.deleteFavorites("people", entity.characters_id, entity.users_id)
															}
															if (entity.planets_id) {
																actions.deleteFavorites("planet", entity.planets_id, entity.users_id)
															}
														}}>
															<GiTrashCan />
														</button>
													</li>
												)
											}) : (<h6 className="text-center">Sin favoritos</h6>)
									}
								</ul>
							</div>
							<div className="ms-2">
								<button onClick={() => { if (actions.logOut()) navigate('/') }} className="btn btn-primary">Cerrar sesión</button>
							</div>
						</>
					) : (
						<>
							<div className="ms-auto">
								<Link to="/registerorlogin">
									<button className="btn btn-primary">Resgister/Login</button>
								</Link>
							</div>
						</>
					)
				}

			</div>
		</nav>
	);
};
