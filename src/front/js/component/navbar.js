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
									<button className="btn btn-primary">Private Riggo!</button>
								</Link>
							</div>
							<div className="ms-2">
								<button onClick={() => { if (actions.logOut()) navigate('/') }} className="btn btn-primary">Cerrar sesión</button>
							</div>
						</>
					) : (
						<>
							<div className="ms-auto">
								<Link to="/signup">
									<button className="btn btn-primary">Resgístrate</button>
								</Link>
							</div>
							<div className="ms-2">
								<Link to="/login">
									<button className="btn btn-primary">Inicia Sesión</button>
								</Link>
							</div>
						</>
					)
				}

			</div>
		</nav>
	);
};
