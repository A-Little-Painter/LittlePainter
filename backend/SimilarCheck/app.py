from flask import Flask, request
import cv2

app = Flask(__name__)

# 지정된 디렉토리에 이미지를 저장하기 위한 함수
def save_uploaded_image(file, save_path):
    file.save(save_path)

# 두 이미지의 유사도를 검사한다.
def similarityCheck(originalPath, newPath):
    originalImg = cv2.imread(originalPath)
    newImg = cv2.imread(newPath)

    # 이미지가 성공적으로 읽혔는지 확인합니다.
    if originalImg is not None and newImg is not None:
        # 두 이미지가 같은 크기인지 확인합니다.
        if originalImg.shape == newImg.shape:
            # MSE 계산
            mse = ((originalImg - newImg) ** 2).mean()

            print("compareResult :", mse)

            return mse

        else:
            print('이미지 크기가 다릅니다.')

    else:
        print('이미지를 읽어올 수 없습니다.')

@app.route('/similarcheck/comm/animals', methods=['POST'])
def SimilarityCheck():
    # JSON 데이터를 파싱하여 세션 ID 추출

    sessionId = request.form.get("sessionId")
    originalFile = request.files['originalFile']
    newFile = request.files['newFile']


    # 파일을 저장할 경로 지정
    originalPath = "./images/"+sessionId+"_originalFile.jpg"
    newPath = "./images/"+sessionId+"_newFile.jpg"


    # 이미지를 서버에 저장
    originalFile.save(originalPath)
    newFile.save(newPath)

    return str(similarityCheck(originalPath, newPath))

# @app.route('/')
# def hello_world():
#     return 'Hello, World!'

if __name__ == '__main__':
    app.run('127.0.0.1', port=8600, debug=True)


