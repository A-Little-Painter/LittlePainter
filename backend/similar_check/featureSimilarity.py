import cv2
import numpy as np

# [사진1]과 [사진2]의 이미지 파일 경로를 지정합니다.
image1_path = 'similarImages/image1.jpg'  # [사진1] 파일 경로
image2_path = 'similarImages/image2.jpg'  # [사진2] 파일 경로

# [사진1] 로드
image1 = cv2.imread(image1_path)
if image1 is None:
    print(f'Unable to load image from {image1_path}')
    exit()

# [사진2] 로드
image2 = cv2.imread(image2_path)
if image2 is None:
    print(f'Unable to load image from {image2_path}')
    exit()

# [사진1]에서 코뿔소의 테두리 영역을 추출
contours1, _ = cv2.findContours(cv2.inRange(image1, (0, 0, 0), (30, 30, 30)), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# [사진2]에서 [사진1]의 코뿔소 테두리를 기반으로 마스크 생성
mask = np.zeros(image2.shape, dtype=np.uint8)
cv2.drawContours(mask, contours1, -1, (255, 255, 255), thickness=cv2.FILLED)

# [사진2]에서 [사진1]의 코뿔소 테두리를 기반으로 영역 추출
result_image = cv2.bitwise_and(image2, mask)

# 테두리 밖의 영역을 하얀색 배경으로 만들기
result_image[np.where((result_image == [0, 0, 0]).all(axis=2))] = [255, 255, 255]

# 결과 이미지를 저장하거나 표시합니다.
cv2.imwrite('similarImages/output.jpg', result_image)
cv2.imshow('Output', result_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
