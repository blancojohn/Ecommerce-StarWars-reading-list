import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (store?.accessToken !== null) {
            actions.routePrivateUser()
        } else { navigate('/') }
    }, [])

    return (
        <>
            {
                store.favorites.length > 0 ?
                    store.favorites.map((favorite) => {
                        <div key={favorite.name}>{favorite.name}</div>
                    }) : (<h1>sin favoritos</h1>)
            }
        </>
    );
};



