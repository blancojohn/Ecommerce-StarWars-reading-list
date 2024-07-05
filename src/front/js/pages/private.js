import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (store?.accessToken !== null) {actions.routePrivateUser()
        }else{navigate('/')}
    }, [])

    return (
        <>
            {
                store.accessToken &&
                <>
                    <h1 className="d-flex justify-content-center">¡{store?.user?.username} estás en una ruta privada con Riggo!</h1>
                    <div className="d-flex justify-content-center">
                    </div>
                </>
            }
        </>
    );
};

