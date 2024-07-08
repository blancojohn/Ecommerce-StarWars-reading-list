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
                    <h1>Characters</h1>
                    {
                        store.characters.map((people, index) => {
                            return (
                                <div key={people.id} className="col-md-3">
                                    <div className="card">
                                        <img src="..." className="card-img-top" alt="..."></img>
                                        <div className="card-body">
                                            <h6 className="card-title">{people.name}</h6>
                                        </div>
                                        <div className="card-body">
                                            <Link to={`/characters/${people.id}`} type="button" className="btn btn-primary">Learn More</Link>
                                            <button onClick={() => {
                                                if (store.accessToken !== null )
                                                    actions.addFavorites(index, "characters", people.id, store.user.id)
                                                else{toast.info("Por favor inicia sesión para guarda tus favoritos")}
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