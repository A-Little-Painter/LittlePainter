# app.py
import logging
import subprocess
from pathlib import Path

from flask import Flask, request, send_file
from flask_restx import Api, Resource
from werkzeug.utils import secure_filename

from examples import image_to_animation

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


def shell_create_animation(input_filename, output_file_path, character, animation_type, title=None, no=None):
    logging.debug(f"shell 명령어 호출_common {input_filename} {output_file_path} {character}")
    cmd = None
    if animation_type == 'animals':
        cmd = f"python AnimatedDrawings/examples/image_to_animation.py {input_filename} {output_file_path} {character} {animation_type}"
    elif animation_type == 'tales':
        cmd = f"python AnimatedDrawings/examples/image_to_animation.py {input_filename} {output_file_path} {character} {animation_type} {title} {no}"
    # 셸 명령 실행
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        logging.error("쉘 커맨드 수행 실패")
        return e.stderr


@api.route('/animations/comm/animals')
class Animals(Resource):
    def post(self):
        OUTPUT_FILE_PATH = "AnimatedDrawings/result/animals"

        # 진입 확인
        logging.debug("Animate-Service : animateAnimal Called")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = shell_create_animation(filename, OUTPUT_FILE_PATH, animal_type, 'animals')
        logging.debug(result)

        # 임시값 반환
        return send_file(f"{OUTPUT_FILE_PATH}/video.gif", mimetype='image/gif')


@api.route('/animations/comm/tales')
class Tales(Resource):
    def post(self):
        OUTPUT_FILE_PATH = "AnimatedDrawings/result/tales"

        # requestbody 수신
        tale_title = request.form['taleTitle']
        character = request.form['character']
        page_no = request.form['pageNo']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = shell_create_animation(filename, OUTPUT_FILE_PATH, character, 'tales', tale_title, page_no)
        logging.debug(result)

        # 임시애니메이션 반환
        return send_file(f"{OUTPUT_FILE_PATH}/video.gif", mimetype='image/gif')


@api.route('/animations/comm/test-dance')
class TestDance(Resource):
    def post(self):
        OUTPUT_FILE_PATH = "AnimatedDrawings/result/test-dance"

        # 진입 확인
        logging.debug("Animate-Service : test dance requested")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = self.shell_create_animation_test(filename, OUTPUT_FILE_PATH)
        logging.debug(result)

        # 임시값 반환
        return send_file(f"{OUTPUT_FILE_PATH}/video.gif", mimetype='image/gif')

    def shell_create_animation_test(self, input_filename, output_file_path):
        logging.debug("shell 명령어 호출_test")
        cmd_test = f"python AnimatedDrawings/examples/image_to_animation.py {input_filename} {output_file_path}"

        # 셸 명령 실행
        try:
            result = subprocess.run(cmd_test, shell=True, capture_output=True, text=True, check=True)
            return result.stdout
        except subprocess.CalledProcessError as e:
            logging.error("쉘 커맨드 수행 실패")
            return e.stderr

@api.route('/animations/comm/test-dance22')
class TestDance22(Resource):
    def post(self):
        output_dir = Path('./AnimatedDrawings/result/test-dance2')
        output_dir.mkdir(exist_ok=True, parents=True)

        # 진입 확인
        logging.debug("Animate-Service22 : test dance requested22")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        image_to_animation(filename, output_dir)

        # 임시값 반환
        return send_file(f"{output_dir}/video.gif", mimetype='image/gif')


if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    app.run('0.0.0.0', port=8700, debug=True)
