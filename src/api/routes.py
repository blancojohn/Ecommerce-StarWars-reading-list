"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import datetime
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Favorite_Planet, Favorite_People, People, Planet, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/characters', methods=['GET']) #Lista todos los personajes.
def get_characters():
    characters= People.query.all()
    characters= list(map(lambda people: people.to_dict(), characters))
    return jsonify(characters), 200

@api.route('/people/<int:people_id>', methods=['GET']) #Muestra un solo personaje en un objeto.
def get_people(people_id):
    people= People.query.filter_by(id= people_id).first()
    result= people.to_dict()
    return jsonify(result), 200


@api.route('/people', methods=['POST']) #Crea un personaje.
def add_characters():
    #Accede por cada campo de la clase People.
    name = request.json.get('name')
    url = request.json.get('url')
    #Muestra los datos recibe por el POST.
    print(name)
    print(url)

    #A continuaciónd preparación del Insert
    people= People()
    people.name= name
    people.url= url

    #A continuación ejecuta el query (el insert de agregar un personaje a la base de datos).
    db.session.add(people)
    #Guarda los cambios en la tabla de la base de datos. 
    db.session.commit()

    return jsonify(people.to_dict()), 201

""" 
Endpoint condicionada para utilizar solo cuando un usuario inicia sesión.
También condicionado según el tipo de entidad para guardar la info en las tabla de esa entidad.
El tipo de entidad se captura desde los componentes al hacer click en el botón me gusta.
Igualmente se capturan la entidad por el id y el usuario id.
"""
@api.route('/favorite/<entity>/<int:favorite_id>/<int:user_id>', methods=['POST']) #Agrega un personaje a un usuario del blog.
def add_favorite_people(entity, favorite_id, user_id):

    #A continuación preparación del Insert
    if entity == "people":
        favorites_characters= Favorite_People()  
        favorites_characters.characters_id= favorite_id
        favorites_characters.users_id= user_id

        #Agrega el personaje favorito agregado por el usuario.
        db.session.add(favorites_characters)
        #Guarda el personaje favorito por los ids asociados.
        db.session.commit()
        return jsonify(favorites_characters.to_dict()), 200

    if entity == "planet":
        favorites_planets= Favorite_Planet()  
        favorites_planets.planets_id= favorite_id
        favorites_planets.users_id= user_id

        #Agrega el planeta favorito agregado por el usuario.
        db.session.add(favorites_planets)
        #Guarda el planeta favorito por los ids asociados.
        db.session.commit()
        return jsonify(favorites_planets.to_dict()), 200

@api.route('/favorite/<entity>/<int:favorite_id>/<int:user_id>', methods= ['DELETE']) #Elimina un personaje de la tabla favorites_characters del usuario.
def delete_favorite_people(entity, favorite_id, user_id):
    #entitys_favorites= Favorite_People()
    #entitys_favorites.characters_id= entitys_id
    if entity == "people":
        entitys_favorites_characters= Favorite_People.query.filter_by(characters_id= favorite_id, users_id= user_id).first()
        db.session.delete(entitys_favorites_characters)
        db.session.commit()

    if entity == "planet":
        entitys_favorites_planets= Favorite_Planet.query.filter_by(planets_id= favorite_id, users_id= user_id).first()
        db.session.delete(entitys_favorites_planets)
        db.session.commit()
    

    return jsonify({"messagge": "Favorite People was deleted!"}), 200

#OPERACIONES DE PLANETAS

@api.route('/planets', methods=['GET']) #lista todos los planetas.
def get_planets():
    planets= Planet.query.all()
    planets= list(map(lambda planet: planet.to_dict(), planets))
    return jsonify(planets), 200

@api.route('/planet/<int:planet_id>', methods=['GET']) #Muestra un solo planeta.
def get_planet(planet_id):
    planet= Planet.query.filter_by(id= planet_id).first()
    result= planet.to_dict()
    return jsonify(result), 200

@api.route('/planet', methods=['POST']) #Crea un planeta.
def add_planets():
    #Accede globalmente a los campos asociados a la clase Planet.
    datos = request.get_json()
    #Estos print muestran los datos recibidos por el POST.
    print(datos['name'])
    print(datos['url'])
    
    #A continuación preparación del Insert.
    planet= Planet()
    planet.name= datos['name']
    planet.url= datos['url']

    #A continuación ejecuta el query (el insert de agregar un planeta a la base de datos).
    db.session.add(planet)
    #Guarda los cambios en la tabla de la base de datos
    db.session.commit()

    return jsonify(planet.to_dict()), 201
                
@api.route('/favorite/planet/<int:planet_id>', methods= ['DELETE']) #Elimina un planeta favorito de la tabla favorites_planets del usuario.
def delete_favorite_planet(planet_id):                              
    user_id= 1
    favorite_planet= Favorite_Planet.query.filter_by(planets_id= planet_id, users_id= user_id).first()

    if not favorite_planet:
        return jsonify({"messagge": "Favorite planet doesn't exist!"}), 404
    
    db.session.delete(favorite_planet)
    db.session.commit()

    return jsonify({"messagge": "Planet was deleted!"}), 200

#OPERACIONES DE USUARIO
# Crea usuarios.
@api.route('/register', methods=['POST'])
def register_user():

    print(request.get_json())# Comprueba que estoy accediendo a los campos.
    username= request.json.get('username')
    email= request.json.get('email')
    password= request.json.get('password')

    #Validadciones:
    if not username:
        return jsonify({"messagge": "Username es requerido."})

    if not email:
        return jsonify({"messagge": "Email es requerido."}), 400
    
    if not password:
        return jsonify({"messagge": "Password es requerido."}), 400
    
    found= User.query.filter_by(email= email).first()
    if found:
        return jsonify({"messagge": "Email existe."}), 400
    
    #Preparación del insert:
    user= User()
    user.username= username
    user.email= email
    user.password= generate_password_hash(password)#Encripta el el password que pase el usuaeio.

    #Agrega los datos y se guardan:
    db.session.add(user)
    db.session.commit()

    return jsonify({"success": "Registro satisfactorio. Por favor hacer click en inicia sesión"}), 200

@api.route('/login', methods=['POST'])
def login_user():

    print(request.get_json())
    email= request.json.get('email')
    password= request.json.get('password')

    #Validadciones:
    if not email:
        return jsonify({"messagge": "Email es requerido."}), 400
    
    if not password:
        return jsonify({"messagge": "Password es requerido."}), 400
    
    #Valida si el email y password son incorrectos.
    user= User.query.filter_by(email= email).first()
    if not user:
        return jsonify({"messagge": "Email/Password son incorrectos."}), 401
    
    if not check_password_hash(user.password, password):
         return jsonify({"messagge": "Email/Password son incorrectos"}), 401
    
    expirate_token = datetime.timedelta(days = 1)
    access_token = create_access_token(identity = user.id, expires_delta = expirate_token)

    datos = {
        "success": "Inicio de sesión exitoso",
        "access_token":access_token,
        "user": user.to_dict()
    }

    return jsonify(datos), 200

#Ruta privada que solicita el token
@api.route('private')
@jwt_required()
def private():
    id= get_jwt_identity() #Accede a la info que se guarda en el token.
    user= User.query.get(id) #Almacena la búsqueda del usuario por el id.
    return jsonify(user.to_dict()), 200

@api.route('/users', methods=['GET'])
def get_users():
    users= User.query.all() #Consulta a todos los usuarios del blog en la base de datos.
    users= list(map(lambda user: user.to_dict(), users)) #Lista todo los usuarios.
    return jsonify(users), 200

@api.route('/<int:user_id>/favorites', methods=['GET'])#Lista todos los favoritos que pertenecen al usuario actual.
def get_user_favorites(user_id):
    user= User.query.get(user_id)
    favorites= []

    for people in user.favorites_characters:
        favorites.append(people.to_dict())

    for planet in user.favorites_planets:
        favorites.append(planet.to_dict())

    entitys= favorites    
    return jsonify(entitys), 200
    

