import cv2
from flask import Flask, jsonify, request, send_from_directory, Response
import os
import uuid
from yolov5 import detect

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/v1/detect', methods=['POST'])
def detect_objects():
    print(request.files)

    if 'file' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['file']
    filename = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4().hex}.jpg")
    file.save(filename)

    # # detect.py 실행
    # cmd = ['python', 'yolov5/detect.py', '--weights', 'yolov5s.pt', '--img', '640', '--conf', '0.25', '--source', filename]
    # result = subprocess.run(cmd, capture_output=True, text=True)
    #
    #
    # os.remove(filename)  # 일시적으로 저장한 파일 삭제
    #
    # if result.returncode == 0:
    #     # 성공적으로 실행된 경우, 로직에 따라 처리 가능
    #     # 예를 들어 결과 이미지를 반환하거나, JSON 형식의 결과를 반환할 수 있습니다.
    #     return jsonify({"message": "Detection successful!"}), 200
    # else:
    #     # 에러 발생 시
    #     return jsonify({"error": result.stderr}), 500


    # cmd = ['python', 'yolov5/detect.py', '--weights', 'yolov5s.pt', '--img', '640', '--conf', '0.25', '--source',
    #        filename]
    # result_images = subprocess.run(cmd)  # 수정된 부분
    #
    # # 여기에서 result_images 리스트에 있는 이미지들을 반환하도록 코드를 작성할 수 있습니다.
    # # 예를 들면, 이미지 한 개만 반환하는 경우:
    # image = result_images[0]
    # _, img_encoded = cv2.imencode('.jpg', image)
    # return Response(img_encoded.tobytes(), mimetype='image/jpeg')

    try:
        # Directly call the detect function from yolov5, assuming it's modified to return the processed image
        im0 = detect.run(weights='yolov5s.pt', source=filename)

        os.remove(filename)  # Remove the temporarily saved file

        _, img_encoded = cv2.imencode('.jpg', im0)
        return Response(img_encoded.tobytes(), mimetype='image/jpeg')

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run('0.0.0.0', port=8500, debug=True)