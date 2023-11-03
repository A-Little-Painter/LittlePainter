# app.py
import logging

from flask import Flask
from flask_restx import Api, Resource

app = Flask(__name__)
api = Api(app)


@api.route('/hello')
class Hello(Resource):
    def get(self):
        key = "hello"
        value = "d106!"
        return {
            key: value
        }


@app.route('/draws/animations/animals')
class AnimateAnimal(Resource):
    def post(self, image, animalType):
        logging.debug("Animate-Service : animateAnimal Called")
        return {
            image: image,
            animalType: animalType
        }


@app.route('/draws/animations/tales')
class AnimateCharacter(Resource):
    def post(self, image, title, pageno):
        logging.debug("Animate-Service : animateCharacter Called")
        return {
            image: image
            , title: title
            , pageno: pageno
            # ,characterName : characterName
        }


if __name__ == "__main__":
    app.run('0.0.0.0', port=8700, debug=True)
