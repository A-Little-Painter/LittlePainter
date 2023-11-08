# app.py
import logging
import subprocess

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


@api.route('/animations/comm/animals')
class TodoSimple(Resource):
    def post(self):
        OUTPUT_FILE = "AnimatedDrawings/examples/result/custom1"

        # 진입 확인
        logging.debug("Animate-Service : animateAnimal Called")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = self.shell_create_animation(filename, OUTPUT_FILE)
        logging.debug(result)

        # 임시값 반환
        return send_file("AnimatedDrawings/examples/result/rabbit/video.gif", mimetype='image/gif')
        # return send_file(f"{OUTPUT_FILE}/video.gif", mimetype='image/gif')

    def shell_create_animation(self, input_filename, output_filename):
        logging.debug("shell 명령어 호출")
        # cmd = (f"python AnimatedDrawings/examples/image_to_animation.py "
        #        f"AnimatedDrawings/examples/result/rabbit/image.png  {output_filename}")
        cmd = "python --version"

        # 셸 명령 실행
        try:
            result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
            return result.stdout
        except subprocess.CalledProcessError as e:
            logging.error("쉘 커맨드 수행 실패")
            return e.stderr


@api.route('/animations/comm/tales')
class AnimateCharacter(Resource):
    def post(self):
        # requestbody 수신
        tale_title = request.form['taleTitle']
        character = request.form['character']
        page_no = request.form['pageNo']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        # todo : cli실행

        # 임시애니메이션 반환
        return send_file("AnimatedDrawings/examples/result/rabbit/video.gif", mimetype='image/gif')


if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    app.run('0.0.0.0', port=8700, debug=True)
