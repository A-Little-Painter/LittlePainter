import cv2
from flask import Flask, jsonify, request, send_from_directory, Response
import os
import uuid
from yolov5 import detect
import base64

def img_to_base64(img):
    _, img_encoded = cv2.imencode('.jpg', img)
    base64_img = base64.b64encode(img_encoded.tobytes()).decode('utf-8')
    return base64_img

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/v1/comm/detect', methods=['POST'])
def detect_objects():

    if 'file' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['file']
    filename = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4().hex}.jpg")
    file.save(filename)

    try:
        # Directly call the detect function from yolov5, assuming it's modified to return the processed image
        rembg_with_border, border_only, animal_type = detect.run(weights='yolov5s.pt', source=filename)

        print(animal_type)

        os.remove(filename)  # Remove the temporarily saved file

        return jsonify({
            "border_image": img_to_base64(rembg_with_border),
            "trace_image": img_to_base64(border_only),
            "animal_type": animal_type
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run('0.0.0.0', port=8500, debug=True)
