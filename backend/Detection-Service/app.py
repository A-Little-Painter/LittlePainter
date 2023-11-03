import cv2
from flask import Flask, jsonify, request, send_from_directory, Response, send_file
import os
import uuid
from yolov5 import detect
import base64
import boto3
from werkzeug.utils import secure_filename
import io
from PIL import Image
import shutil


# def save_image_to_disk(image_np, base_filename, folder, extension):
#     """넘파이 이미지 배열을 디스크에 저장하고 파일 경로를 반환합니다."""
#     filename = f"{base_filename}{extension}"
#     file_path = os.path.join(folder, filename)
#
#     image = Image.fromarray(image_np)
#
#     # RGBA 이미지를 RGB로 변환
#     if image.mode == 'RGBA':
#         # 알파 채널이 있으면 제거하고 RGB 모드로 변환
#         background = Image.new('RGB', image.size, (255, 255, 255))
#         background.paste(image, mask=image.split()[3])  # 3은 알파 채널
#         image = background
#
#     image.save(file_path, 'JPEG', quality=95)  # JPEG 형식으로 저장
#     return file_path

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def clear_upload_folder():
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

def img_to_file(img_nparray, prefix=""):
    # Generate a unique file name with a prefix and save the image
    file_name = os.path.join(UPLOAD_FOLDER, f"{prefix}{uuid.uuid4().hex}.jpg")
    cv2.imwrite(file_name, img_nparray)
    return file_name

def rembg_to_file(img, prefix=""):
    rembg_file_name = os.path.join(UPLOAD_FOLDER,f"{prefix}{uuid.uuid4().hex}.jpg")
    shutil.copyfile('filename.png', rembg_file_name)
    return rembg_file_name

@app.route('/api/v1/detection/comm/detect', methods=['POST'])
def detect_objects():

    if 'file' not in request.files:
        return jsonify({"error": "No image provided"}), 400


    S3_BUCKET = request.form.get('S3_BUCKET')
    S3_KEY = request.form.get('S3_KEY')
    S3_SECRET = request.form.get('S3_SECRET')
    S3_REGION = request.form.get('S3_REGION')

    if not all([S3_BUCKET, S3_KEY, S3_SECRET, S3_REGION]):
        return jsonify({"error": "S3 configuration is incomplete"}), 400

    s3_client = boto3.client(
        's3',
        region_name=S3_REGION,
        aws_access_key_id=S3_KEY,
        aws_secret_access_key=S3_SECRET
    )

    file = request.files['file']
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename_base = uuid.uuid4().hex
    temp_filename = f"{unique_filename_base}{file_extension}"
    temp_local_file = os.path.join(UPLOAD_FOLDER, temp_filename)
    file.save(temp_local_file)

    try:
        # Directly call the detect function from yolov5, assuming it's modified to return the processed image
        rembg_with_border, border_only, animal_type = detect.run(weights='yolov5s.pt', source=temp_local_file)

        rembg_with_border = rembg_to_file(rembg_with_border, "border_")
        border_only = img_to_file(border_only, "trace_")

        # 이미지 데이터를 S3에 업로드합니다.
        rembg_filename = f"{unique_filename_base}_rembg{file_extension}"

        s3_client.upload_file(rembg_with_border, S3_BUCKET, rembg_filename, ExtraArgs={'ContentType': 'image/jpeg'})  # ContentType 설정)

        rembg_url = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{rembg_filename}"

        border_filename = f"{unique_filename_base}_trace{file_extension}"

        s3_client.upload_file(border_only, S3_BUCKET, border_filename, ExtraArgs={'ContentType': 'image/jpeg'})  # ContentType 설정)

        trace_url = f"https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/{border_filename}"

        os.remove('filename.png')

        # 로컬 파일 삭제
        os.remove(temp_local_file)

        clear_upload_folder()

        return jsonify({
            "border_image": rembg_url,
            "trace_image": trace_url,
            "animal_type": animal_type
        })

    except Exception as e:
        if os.path.exists(temp_local_file):
            os.remove(temp_local_file)
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run('0.0.0.0', port=8500, debug=True)
