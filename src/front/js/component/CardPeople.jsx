import React, { useContext } from "react";
import { Context } from '../store/appContext';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon.jsx";


const CardPeople = () => {
    const { store, actions } = useContext(Context)

    return (
        <>
            <div className="container">
                <div className="row">
                    <h1 className="text-light">Characters</h1>
                    {
                        store.characters.map((people) => {
                            return (
                                <div key={people.id} className="col-md-2">
                                    <div className="card bg-dark">
                                        <img
                                            src={
                                                "https://starwars-visualguide.com/assets/img/characters/" +
                                                people.id +
                                                ".jpg"
                                            }
                                            width="100%"
                                            alt="..."
                                        ></img>
                                        <div className="card-body">
                                            <Link to={`/characters/${people.id}`} className="text-light">{people.name}</Link>
                                            <button onClick={() => {
                                                if (store.accessToken !== null)
                                                    actions.addFavorites("people", people.id)
                                                else { toast.info("Por favor inicia sesión para guarda tus favoritos") }
                                            }} className={`likeBtn ${people.liked ? "liked" : ""}`}>
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

export default CardPeople