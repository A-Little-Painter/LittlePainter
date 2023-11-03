import sys
import numpy as np
import cv2

# 영상 불러오기
# src1 = cv2.imread('./images/gom1.png', cv2.IMREAD_GRAYSCALE)
# src2 = cv2.imread('./images/gom2.png', cv2.IMREAD_GRAYSCALE)

src1 = cv2.imread('./images/image0.jpg', cv2.IMREAD_GRAYSCALE)
src2 = cv2.imread('./images/image1.jpg', cv2.IMREAD_GRAYSCALE)

if src1 is None or src2 is None:
    print('Image load failed!')
    sys.exit()

# 특징점 알고리즘 객체 생성 (KAZE, AKAZE, ORB 등)
#feature = cv2.KAZE_create()
feature = cv2.AKAZE_create()
#feature = cv2.ORB_create()

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




# -------------------------
# # 결과 이미지 출력
# cv2.imshow('Matched KeyPoints', match_img)
# cv2.waitKey(0)
# cv2.destroyAllWindows()
# # 검출된 특징점 출력 영상 생성
# dst1 = cv2.drawKeypoints(src1,
#                          kp1,
#                          None,
#                          flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
# dst2 = cv2.drawKeypoints(src2,
#                          kp2,
#                          None,
#                          flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
#
# cv2.imshow('dst1', dst1)
# cv2.imshow('dst2', dst2)
# cv2.waitKey()
# cv2.destroyAllWindows()