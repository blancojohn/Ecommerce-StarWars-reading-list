import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


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
