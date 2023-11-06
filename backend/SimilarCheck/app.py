from flask import Flask, request
import cv2
import sys

app = Flask(__name__)

# 지정된 디렉토리에 이미지를 저장하기 위한 함수
def save_uploaded_image(file, save_path):
    file.save(save_path)

# 두 이미지의 유사도를 검사한다.
def similarityCheck(originalPath, newPath):
    src1 = cv2.imread(originalPath, cv2.IMREAD_GRAYSCALE)
    src2 = cv2.imread(newPath, cv2.IMREAD_GRAYSCALE)

    if src1 is None or src2 is None:
        print('Image load failed!')
        sys.exit()

    # 특징점 알고리즘 객체 생성 (KAZE, AKAZE, ORB 등)
    # feature = cv2.KAZE_create()
    # feature = cv2.AKAZE_create()
    feature = cv2.ORB_create()

    # 특징점 검출 및 기술자 계산
    kp1 = feature.detect(src1)
    _, desc1 = feature.compute(src1, kp1)

    kp2, desc2 = feature.detectAndCompute(src2, None)

    print('desc1.shape:', desc1.shape)
    print('desc1.dtype:', desc1.dtype)
    print('desc2.shape:', desc2.shape)
    print('desc2.dtype:', desc2.dtype)

    # 특징점 일치 검출
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(desc1, desc2)
    matches = sorted(matches, key=lambda x: x.distance)

    # 일치 특징점 그리기
    match_img = cv2.drawMatches(src1, kp1, src2, kp2, matches[:10], outImg=None)

    # 일치 정확도 측정
    match_accuracy = len(matches) / len(kp1)

    print('Match accuracy:', match_accuracy)

    return match_accuracy


@app.route('/similarcheck/comm/animals', methods=['POST'])
def SimilarityCheck():
    # JSON 데이터를 파싱하여 세션 ID 추출

    roomId = request.form.get("roomId")
    originalFile = request.files['originalFile']
    newFile = request.files['newFile']


      # 파일을 저장할 경로 지정
    originalPath = "./images/"+roomId+"_"+originalFile.name+".jpg";
    newPath = "./images/"+roomId+"_"+newFile.name+".jpg";


    # 이미지를 서버에 저장
    originalFile.save(originalPath)
    newFile.save(newPath)

    return str(similarityCheck(originalPath, newPath))

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run('0.0.0.0', port=8600, debug=True)


