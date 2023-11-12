# app.py
import logging
import os
import subprocess
from pathlib import Path
from datetime import datetime

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


def shell_create_animation(input_filename, output_file_path, character, animation_type, title=None, no=None):
    logging.debug(f"shell 명령어 호출_common {input_filename} {output_file_path} {character}")

    cmd = generate_command(input_filename, output_file_path, character, animation_type, title, no)
    # 셸 명령 실행
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        logging.error("쉘 커맨드 수행 실패")
        return e.stderr


def generate_command(input_filename, output_file_path, character, animation_type, title=None, no=None):
    base_cmd = f"python AnimatedDrawings/examples/image_to_animation.py {input_filename} {output_file_path} {character} {animation_type}"
    if animation_type == 'tales':
        base_cmd += f" {title} {no}"
    return base_cmd.strip()


@api.route('/animations/comm/animals')
class Animals(Resource):
    def post(self):
        # 진입 확인
        logging.debug("Animate-Service : animateAnimal Called")

        # requestbody 수신
        animal_type = request.form['animalType']
        image = request.files['image']

        # requestbody 확인되면 요청별 전용 경로 생성
        animal_list = ['곰', '낙타', '돼지', '얼룩말', '원숭이', '코뿔소', '판다', '하마', '호랑이']
        if animal_type in animal_list:
            # 월일시분초에 따른 전용폴더에서 작업
            OUTPUT_FILE_PATH = f"/app/AnimatedDrawings/result/animals/{animal_type}/{datetime.now().strftime('%m%d%H%M%S')}"
            Path(OUTPUT_FILE_PATH).mkdir(exist_ok=True, parents=True)
        else:
            return {
                "message": "동물 이름(animalType) 잘못됨"
            }, 400


        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = shell_create_animation(filename, OUTPUT_FILE_PATH, animal_type, 'animals')
        logging.debug(result)

        # 임시로 저장한 이미지 삭제
        os.remove(filename)

        # 임시값 반환
        return send_file(f"{OUTPUT_FILE_PATH}/video.gif", mimetype='image/gif')


@api.route('/animations/comm/tales')
class Tales(Resource):
    def post(self):
        # requestbody 수신
        tale_title = request.form['taleTitle']
        character = request.form['character']
        page_no = request.form['pageNo']
        image = request.files['image']

        # requestbody 확인되면 요청별 전용 경로 생성
        tale_list = ['방귀시합']
        # if tale_title in
        OUTPUT_FILE_PATH = f"AnimatedDrawings/result/tales/{tale_title}/{character}{page_no}/{datetime.now().strftime('%m%d%H%M%S')}"
        Path(OUTPUT_FILE_PATH).mkdir(exist_ok=True, parents=True)

        # 이미지 저장
        filename = secure_filename(image.filename)
        image.save(filename)

        # 저장한 이미지로 애니메이션 생성
        result = shell_create_animation(filename, OUTPUT_FILE_PATH, character, 'tales', tale_title, page_no)
        logging.debug(result)

        # 임시로 저장한 이미지 삭제
        os.remove(filename)

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


if __name__ == "__main__":
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    app.run('0.0.0.0', port=8700, debug=True)
