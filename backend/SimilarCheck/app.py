from flask import Flask, request, send_file
import cv2, sys, os
import numpy as np
from PIL import Image

app = Flask(__name__)

# 두 이미지의 유사도를 검사한다.
def similarityCheckTest(originalPath, newPath):
    src1 = cv2.imread(originalPath, cv2.IMREAD_GRAYSCALE)
    src2 = cv2.imread(newPath, cv2.IMREAD_GRAYSCALE)

    if src1 is None or src2 is None:
        print('Image load failed!')
        sys.exit()

    # 특징점 알고리즘 객체 생성
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

    print('유사도:', match_accuracy)

    return match_accuracy

# 테두리 영역 안의 그림만 추출한다.
def borderExtractionTest(roomId, originalPath, newPath):

    originalImage = cv2.imread(originalPath)
    if originalImage is None:
        print(f'Unable to load image from {originalPath}')
        exit()

    newImage = cv2.imread(newPath)
    if newImage is None:
        print(f'Unable to load image from {newPath}')
        exit()

    # [originalImage]에서 테두리 영역을 추출
    contours1, _ = cv2.findContours(cv2.inRange(originalImage, (0, 0, 0), (30, 30, 30)), cv2.RETR_EXTERNAL,
                                    cv2.CHAIN_APPROX_SIMPLE)



    # [newImage]에서 [originalImage]의 테두리를 기반으로 마스크 생성
    mask = np.zeros(newImage.shape, dtype=np.uint8)
    cv2.drawContours(mask, contours1, -1, (255, 255, 255), thickness=cv2.FILLED)

    # mask = cv2.bitwise_not(mask)

    # cv2.imwrite('./borderImages/' + roomId + 'output1.jpg', mask)

    # [newImage]에서 [originalImage]의 테두리를 기반으로 영역 추출
    result_image = cv2.bitwise_and(newImage, mask)

    #cv2.imwrite('./borderImages/' + roomId + 'output2.jpg', result_image)

    # mask 영역의 검은색 부분이 있는 위치를 찾습니다.
    black_pixels_in_mask = (mask == [0, 0, 0]).all(axis=2)

    # result_image에서 mask 영역의 검은색 부분에 해당하는 영역에서만 픽셀을 하얀색으로 변경
    result_image[black_pixels_in_mask] = [255, 255, 255]

    # 결과 이미지를 저장
    cv2.imwrite('./borderImages/'+roomId+'output.jpg', result_image)

    # 결과 이미지를 보여줌
    # cv2.imshow('./borderImages/output.jpg', result_image)

# 원본의 이미지 테두리를 회색에서 검은색으로 변경해서 저장함
def colorChangeToBlack(originalPath):
    # 이미지 열기
    image = Image.open(originalPath)

    # 이미지 크기 가져오기
    width, height = image.size

    # 이미지 픽셀 데이터 가져오기
    pixels = list(image.getdata())

    # 모든 흰색 픽셀을 검은색으로 바꾸기
    for i in range(len(pixels)):
        if pixels[i] != (255, 255, 255):
            pixels[i] = (0, 0, 0)

    # 변경된 픽셀 데이터를 이미지로 다시 만들기
    new_image = Image.new('RGB', (width, height))
    new_image.putdata(pixels)

    # 이미지 저장
    new_image.save(originalPath)


@app.route('/border-extraction', methods=['POST'])
def borderExtraction():
    roomId = request.form.get('roomId')
    originalFile = request.files['originalFile']
    newFile = request.files['newFile']

    # 파일을 저장할 경로 지정
    originalPath = './borderImages/' + roomId + originalFile.name + '.jpg';
    newPath = './borderImages/' + roomId + newFile.name + '.jpg';

    # 파일을 서버에 저장
    originalFile.save(originalPath)
    newFile.save(newPath)

    # originalFile의 색을 변경(회색 → 검은색)
    colorChangeToBlack(originalPath)

    # 파일에서 테두리 안의 데이터 추출
    borderExtractionTest(roomId, originalPath, newPath)

    # 이미지를 서버에서 삭제
    #os.remove(originalPath)
    #os.remove(newPath)

    return send_file('./borderImages/'+roomId+'output.jpg', as_attachment=True)


@app.route('/similarcheck', methods=['POST'])
def similarityCheck():

    # JSON 데이터 파싱
    roomId = request.form.get("roomId")
    originalFile = request.files['originalFile']
    newFile = request.files['newFile']

    # 파일을 저장할 경로 지정
    originalPath = "./similarImages/"+ roomId + originalFile.name + ".jpg";
    newPath = "./similarImages/"+ roomId + newFile.name + ".jpg";

    # 이미지를 서버에 저장
    originalFile.save(originalPath)
    newFile.save(newPath)

    # 두 이미지의 유사도 측정
    result = str(similarityCheckTest(originalPath, newPath))

    # 이미지를 서버에서 삭제
    os.remove(originalPath)
    os.remove(newPath)

    return result

if __name__ == '__main__':
    app.run('0.0.0.0', port=8600, debug=True)
