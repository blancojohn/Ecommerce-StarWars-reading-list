import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router-dom";


const DetailsPeople = () => {
    const { store, actions } = useContext(Context)
    const { name, description } = store.detailsPeople
    const params = useParams()

    useEffect(() => {
        actions.getDetailsPeople(params.id)
    }, [params.id])

    return (
        <>
            <div className="container card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="https://picsum.photos/id/129/200/200" className="img-fluid rounded-start" alt="..."></img>
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

export default DetailsPeople