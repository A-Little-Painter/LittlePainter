
import shutil
import tempfile
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

    # 팽창을 위한 커널 생성
    kernel = np.ones((5, 5), np.uint8)  # 팽창을 위한 5x5 크기의 커널, 크기는 상황에 따라 조절 가능

    # contour 기반으로 마스크 생성 후 팽창 적용
    mask = np.zeros(newImage.shape, dtype=np.uint8)
    cv2.drawContours(mask, contours1, -1, (255, 255, 255), thickness=cv2.FILLED)
    mask = cv2.dilate(mask, kernel, iterations=3)  # iterations 값은 팽창의 강도를 결정

    # [newImage]에서 [originalImage]의 테두리를 기반으로 영역 추출
    result_image = cv2.bitwise_and(newImage, mask) # result_image는 newImage와 기존 테두리의 교점

    # mask 영역의 검은색 부분이 있는 위치를 찾는다.
    black_pixels_in_mask = (mask == [0, 0, 0]).all(axis=2)

    # result_image에서 mask 영역의 검은색 부분에 해당하는 영역에서만 픽셀을 하얀색으로 변경
    result_image[black_pixels_in_mask] = [255, 255, 255]

    # 테두리 이용해서 사용하지 않는 부분 제거
    non_black_pixels = np.where(~black_pixels_in_mask)
    t, b = np.min(non_black_pixels[0]), np.max(non_black_pixels[0])
    l, r = np.min(non_black_pixels[1]), np.max(non_black_pixels[1])
    result_image = result_image[t:b, l:r]
    mask = mask[t:b, l:r]

    # mask 검은 테두리 생성
    width, height = r-l, t-b
    border = np.zeros((height + 2, width + 2), dtype="uint8")
    border[1:-1, 1:-1] = (0, 0, 0)
    cv2.copyTo(border, mask)

    # 결과 이미지를 저장
    cv2.imwrite('./borderImages/' + roomId + 'output.jpg', result_image)
    cv2.imwrite('./borderImages/' + roomId + 'output_mask.jpg', mask)


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


def removeFile():
    folder_path = './borderImages/'  # 삭제하려는 폴더 경로
    file_to_exclude = 'borderImageData'  # 제외할 파일명
    # 폴더 내 파일들을 리스트업하고 특정 파일을 제외하고 삭제
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        try:
            if os.path.isfile(file_path) and file_to_exclude not in filename:
                os.remove(file_path)
                print(f'{file_path} 파일이 삭제되었습니다.')
        except Exception as e:
            print(f'파일 삭제 중 에러 발생: {e}')


@app.route('/border-extraction', methods=['POST'])
def borderExtraction():
    #이전에 있던 파일 삭제하기
    removeFile()
    print("come")
    # JSON 데이터 파싱
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
    os.remove(originalPath)
    os.remove(newPath)
    # 이미지 여러개 전송
    temp_dir = tempfile.mkdtemp()
    shutil.copy(f'./borderImages/{roomId}output.jpg', os.path.join(temp_dir, 'output.jpg'))
    shutil.copy(f'./borderImages/{roomId}output_mask.jpg', os.path.join(temp_dir, 'output_mask.jpg'))
    shutil.make_archive(temp_dir, 'zip', temp_dir)
    # shutil.copy(f'{temp_dir}.zip', '/app/')
    return send_file(temp_dir+'.zip', as_attachment=True)


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
