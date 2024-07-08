import { toast } from "react-toastify";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			registerUser: {
				username: "",
				email: "",
				password: ""
			},

			loginUser: {
				email: "",
				password: ""
			},

			//Entidades
			characters: [],
			planets: [],

			//Descripción de una entidad para las vistas DetailsPeople o DetailsPlanet
			detailsPeople: {},
			detailsPlanet: {},

			favorites: [],

			/* Las siguientes propiedades guardan los datos de usuario luego de iniciar sesión
			   porque después son untilizados en el sessionStorage */
			user: null,
			accessToken: null, /* Propiedad que recibe el valor de access_token desde la API cuando crea el token */

			urlApi: "http://127.0.0.1:3001/api",

		},
		actions: {

			getFavorites: (user_id) => {
				const { urlApi, } = getStore()
				fetch(`${urlApi}/${user_id}/favorites`)
					.then(res => res.json())
					.then(data => {
						setStore({
							favorites: data
						})
					})
			},

			addFavorites: (index, entity, people_id) => {
				/* Necesito la propiedad del store favorites para luego hacer el spread operator
				   cada vez que se agrega una entidad favorita */
				const store = getStore()
				const { favorites, urlApi, user } = store

				const url = `${urlApi}/favorite/${entity}/${people_id}/${user.id}`

				const requestOptions = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				};

				fetch(url, requestOptions)
					.then(res => res.json())
					.then(data => console.log("DATOS", data))
					.catch(err => console.error(err))

			},

			getDetailsPeople: (id) => {
				const { urlApi } = getStore()
				fetch(`${urlApi}/people/${id}`)
					.then(res => res.json())
					.then(data => {
						setStore({ detailsPeople: data })
					})
					.catch(err => console.error(err))
			},

			getDetailsPlanet: (id) => {
				const { urlApi } = getStore()
				fetch(`${urlApi}/planet/${id}`)
					.then(res => res.json())
					.then(data => {
						setStore({ detailsPlanet: data })
					})
					.catch(err => console.error(err))
			},

			getEntitys: () => {
				const { urlApi } = getStore()
				fetch(`${urlApi}/characters`)
					.then(res => res.json())
					.then(data => {
						let result = data.map((entity) => {
							return {
								...entity,
								liked: false
							}
						})
						setStore({
							characters: result
						})
					})

					.catch(err => console.error(err))
				fetch(`${urlApi}/planets`)
					.then(res => res.json())
					.then(data => {
						let result = data.map((entity) => {
							return {
								...entity,
								liked: false
							}
						})
						setStore({
							planets: result
						})
					})
					.catch(err => console.error(err))
			},

			/* Mantiene abierta la sesión del usuario por los valores asignados
			   a las propiedades del store de sessionStorage. Se ejecuta dentro appContext */
			checkCurrentUser: () => {
				setStore({
					accessToken: sessionStorage.getItem('access_token'),
					user: JSON.parse(sessionStorage.getItem('user'))/* Convierte de nuevo los datos en formato json */
				})
			},

			routePrivateUser: () => {

				const { urlApi, accessToken } = getStore()
				const { getFetch } = getActions()
				const url = `${urlApi}/private`
				const solicitud = {
					method: 'GET', /* Se debe especificar el  tipo de solicitud y agregar headers para poder pasar el token generado en el  login */
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${accessToken}`
					}
				}

				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then(datos => {
					if (datos.msg) {
						toast.error(datos.msg)
					} else {
						setStore({
							user: datos
						})
					}
				})
			},

			handleSubmitLogin: (e) => {
				e.preventDefault()

				const { loginUser, urlApi } = getStore()
				const { getFetch } = getActions()

				/* URL a acceder */
				const url = `${urlApi}/login`
				/* Transforma los datos en string */
				const raw = JSON.stringify(loginUser)
				/* Crea las opciones de la petición */
				const solicitud = {
					method: 'POST',
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}

				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.messagge) {
						toast.error(datos.messagge)
					} else {
						toast.success(datos.success)
						setStore({
							loginUser: {
								email: "",
								password: "",
							},

							/* Se setean las siguientes propiedades del store con los datos de usuario 
								cuando hace login para después usarlas en el sessionStorage */
							user: datos.user,
							accessToken: datos.access_token
						})
					}
					/* A continuación acceso al sessionStorage para mantener los datos de usuario mientras navega con su usuario */
					sessionStorage.setItem('access_token', datos.access_token)
					sessionStorage.setItem('user', JSON.stringify(datos.user))/* user es un diccionario en la tabla por lo tanto debe ser covertido en string*/
				}).catch(error => console.log(error))
			},

			handleChangeLogin: (e) => {

				const { loginUser } = getStore()
				const { name, value } = e.target

				loginUser[name] = value
				setStore({
					loginUser: loginUser
				})
			},

			handleSubmitRegister: (e) => {
				e.preventDefault()

				const { registerUser, urlApi } = getStore()
				const { getFetch } = getActions()

				/* URL a acceder */
				const url = `${urlApi}/register`
				/* Transforma los datos en string */
				const raw = JSON.stringify(registerUser)
				/* Crea las opciones de la petición */
				const solicitud = {
					method: 'POST',
					body: raw,
					headers: {
						"Content-Type": "application/json"
					}
				}

				const request = getFetch(url, solicitud)
				request.then((response) => response.json()).then((datos) => {
					if (datos.messagge) {
						toast.error(datos.messagge)
					} else {
						toast.success(datos.success)
						setStore({
							registerUser: {
								username: "",
								email: "",
								password: ""
							}
						})
					}
				}).catch(error => console.log(error))
			},

			handleChangeRegister: (e) => {
				const { registerUser } = getStore()
				/* En la siguiente destructuración la variable name se le asigna los valores del evento onChange en el fomulario.*/
				const { name, value } = e.target
				/* name es el atributo de las etiquetas inputs del formualrio. 
				Es una variable programada en la que el nombre de la variable pasa a ser el nombre del atributo de la etiqueta.
				Por lo tanto, sus valores son username, email y password de los atributos name */
				registerUser[name] = value
				setStore({
					registerUser: registerUser
				})
			},

			logOut: () => {
				setStore({
					user: null,
					accessToken: null,
					favorites: []
				})

				sessionStorage.removeItem('user')
				sessionStorage.removeItem('access_token')
			},

			getFetch: (url, solicitud) => {
				return fetch(url, solicitud)
			},
		}
	};
};

export default getState;




