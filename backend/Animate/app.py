# app.py
import logging

from flask import Flask, request, send_file
from flask_restx import Api, Resource
from werkzeug.utils import secure_filename

app = Flask(__name__)
api = Api(app)


@api.route('/hello')
class Hello(Resource):
    def get(self):
        key = "hello"
        value = "d106!@##"
        return {
            key: value
        }, 201, None


@api.route('/draws/animations/animals')
class TodoSimple(Resource):
    def post(self):
        # 진입 확인
        logging.debug("Animate-Service : animateAnimal Called")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        # todo : cli실행

        # 임시값 반환
        return send_file("examples/result/rabiit/video.gif", mimetype='image/gif')


@api.route('/draws/animations/tales')
class AnimateCharacter(Resource):
    def post(self):
        # requestbody 수신
        animal_type = request.form['animalType']
        pageNo = request.form['pageNo']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        # todo : cli실행

        # 임시애니메이션 반환
        return send_file("examples/result/rabiit/video.gif", mimetype='image/gif')


if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    app.run('0.0.0.0', port=8700, debug=True)