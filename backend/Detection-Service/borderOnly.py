import cv2
import numpy as np
from rembg import remove
from PIL import Image

input = Image.open('./KakaoTalk_20231017_090919828_02.jpg')  # Load image
output = remove(input)  # Remove background

# Convert the output image to OpenCV format
output_cv = np.array(output)

# Convert the image to grayscale from the alpha channel
gray = output_cv[:, :, 3]

# Threshold the image to create a binary mask
_, thresh = cv2.threshold(gray, 1, 255, cv2.THRESH_BINARY)

# Optional: Apply Canny edge detection for more clarity
edges = cv2.Canny(thresh, 50, 150)

# Find contours in the thresholded image
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

# Create an all-white image
border_img = np.ones_like(output_cv) * 255

# Draw the contours with increased thickness on the white image
cv2.drawContours(border_img, contours, -1, (0, 0, 0), 25)  # Here the thickness is set to 2

# Convert the OpenCV image back to PIL format
output_with_border = Image.fromarray(border_img)
output_with_border.save('border_only.PNG')
