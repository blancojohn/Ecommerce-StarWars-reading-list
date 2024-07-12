import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";


const DetailsPlanet = () => {
    const { store, actions } = useContext(Context)
    const { name, description, id } = store.detailsPlanet
    const params = useParams()

    useEffect(() => {
        actions.getDetailsPlanet(params.id)
    }, [params.id])

    return (
        <>
            <div className="container card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={
                                "https://starwars-visualguide.com/assets/img/planets/" +
                                id +
                                ".jpg"
                            }
                            className="card-img-top"
                            alt="..."
                        ></img>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsPlanet