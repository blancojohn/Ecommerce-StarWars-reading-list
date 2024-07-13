import React, { useContext } from "react";
import { Context } from '../store/appContext'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon.jsx";


const CardPlanet = () => {
    const { store, actions } = useContext(Context)

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="text-light">Planets</h1>
                    {
                        store.planets.map((planet) => {
                            return (
                                <div key={planet.id} className="col-md-2">
                                    <div className="card bg-dark">
                                        <img
                                            src={
                                                "https://starwars-visualguide.com/assets/img/planets/" +
                                                planet.id +
                                                ".jpg"
                                            }
                                            width="100%"
                                            alt="..."
                                        ></img>
                                        <div className="card-body">
                                            <Link to={`/planets/${planet.id}`} className="text-light">{planet.name}</Link>
                                            <button onClick={() => {
                                                if (store.accessToken !== null)
                                                    actions.addFavorites("planet", planet.id);
                                                else { toast.info("Por favor inicia sesión para guardar tus favoritos.") }
                                            }} className={`likeBtn ${planet.liked ? "liked" : ""}`}>
                                                <HeartIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default CardPlanet