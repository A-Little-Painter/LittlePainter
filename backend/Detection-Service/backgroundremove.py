# from rembg import remove
# from PIL import Image
#
# input = Image.open('./KakaoTalk_20231017_090919828_02.jpg') # load image
# output = remove(input) # remove background
# output.save('rembg.PNG') # save image

import cv2
import numpy as np
from rembg import remove
from PIL import Image

input = Image.open('./gaDog.jpg')  # Load image
output = remove(input)  # Remove background

# Convert the output image to OpenCV format
output_cv = np.array(output)

# Convert the image to grayscale
gray = cv2.cvtColor(output_cv, cv2.COLOR_BGR2GRAY)

# Threshold the image to create a binary mask
_, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)

# Find edges using Canny edge detector
edges = cv2.Canny(thresh, 50, 150)

# Find contours based on edges
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Draw contours with a specific thickness and color
for contour in contours:
    cv2.drawContours(output_cv, [contour], 0, (0, 0, 255), 2)  # Red border

# Convert the OpenCV image back to PIL format
output_with_border = Image.fromarray(output_cv)
output_with_border.save('rembg_with_border.PNG')
