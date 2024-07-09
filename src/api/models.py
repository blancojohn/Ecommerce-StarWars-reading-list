from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class People(db.Model): #Contiene los personajes de StarWars.
    __tablename__= 'characters'
    id= db.Column(db.Integer, primary_key= True)
    name= db.Column(db.String(30), nullable= False)
    description= db.Column(db.String(999), nullable= False)
    favorites_users= db.relationship('Favorite_People', backref='people')#El backref permite saber cuale planetas fueron seleccionados como favoritos por un usuario.

    def to_dict(self):  #CONVIERTE EL OBJETO CLASE EN UN DICCIONARIO#
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "favorites_users": list(map(lambda user: user.id, self.favorites_users))#crea lista con los id de los usuarios que agregaron personajes favoritos.
        }
    
class Favorite_People(db.Model):
    __tablename__= 'favorites_characters'
    id= db.Column(db.Integer, primary_key= True)
    characters_id = db.Column(db.Integer, db.ForeignKey('characters.id'))
    users_id= db.Column(db.Integer, db.ForeignKey('users.id'))
    favorites= db.relationship(People, uselist= False)

    def to_dict(self):
        #Instancia de People para acceder a los campos que están relacionados con esta tabla y retornar el name y la descrpción de esta entidad en el perfil del usuario.
        #favorites= People.query.get(self.characters_id)
        return {
            "id": self.id,
            "characters_id": self.characters_id,
            "users_id": self.users_id,
            "name": self.favorites.name,
            "descrption": self.favorites.description
        }
    
class Planet(db.Model): #Contiene los planetas de StarWars.
    __tablename__= 'planets'
    id= db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String(200), nullable= False)
    description= db.Column(db.String(999), nullable= False)
    favorites_users= db.relationship('Favorite_Planet', backref= 'planet')#El backref permite saber cuale planetas fueron seleccionados como favoritos por un usuario.
                                                                                         
    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "favorites_users": list(map(lambda user: user.id, self.favorites_users))#crea lista con los id de los usuarios que agregaron planetas favoritos.
        }
    
class Favorite_Planet(db.Model):
    __tablename__= 'favorites_planets'
    id= db.Column(db.Integer, primary_key= True)
    planets_id= db.Column(db.Integer, db.ForeignKey('planets.id'))
    users_id= db.Column(db.Integer, db.ForeignKey('users.id'))
    favorites= db.relationship(Planet, uselist= False)


    def to_dict(self):
        #Instancia de Planet para acceder a los campos que están relacionados con esta tabla y retornar el name y la descripción de la entidad en el perfil del usaurio.
        #favorites= Planet.query.get(self.planets_id)
        return {
            "id": self.id,
            "planets_id": self.planets_id,
            "users_id": self.users_id,
            "name": self.favorites.name,
            "description": self.favorites.description
        }

class User(db.Model): #Contiene los usuarios agragdos al block
    __tablename__ = 'users'
    id= db.Column(db.Integer, primary_key=True)
    username= db.Column(db.String(120), nullable=False, unique=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    favorites_characters= db.relationship('Favorite_People', backref= 'user')#Devuelve una lista de los personajes agregados.
    favorites_planets= db.relationship('Favorite_Planet', backref= 'user')#Devuelve una lista de los planetas agregados.
    favorites= db.relationship('Favorite')

    def to_dict(self):
        
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }

