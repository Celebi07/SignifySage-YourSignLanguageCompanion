import cv2
import numpy as np
from flask import Flask, Response, render_template
from flask_cors import CORS
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
from keras.models import load_model
print("1")
app = Flask(__name__)
CORS(app)

# Create a VideoCapture object to open the default camera (usually camera index 0)
cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)

offset = 20
imgSize = 300

try:
    
    model = load_model("./Models/hand_det_model2.h5", compile=False)
except Exception as e:
    print(e)
class_names = ["A", "B", "C", "D", "E", "F"] 
gesture_names = ["Hello", "I Love You", "Thank You", "Good Work", "Yes", "NONE"]

gesture_text = ""

print("2")

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()
print("3")
def generate_frames():
    while True:
        success, img = cap.read()
        hands, img = detector.findHands(img)

        if hands:
            hand = hands[0] 
            x, y, w, h = hand['bbox']

            imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
            imgCrop = img[y - offset:y + h + offset, x - offset:x + w + offset]

            imgCropShape = imgCrop.shape

            aspectRatio = h / w

            try:
                if aspectRatio > 1:
                    k = imgSize / h
                    wCal = math.ceil(k * w)
                    imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                    imgResizeShape = imgResize.shape
                    wGap = math.ceil((imgSize - wCal) / 2)
                    imgWhite[:, wGap:wCal + wGap] = imgResize

                else:
                    k = imgSize / w
                    hCal = math.ceil(k * h)
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                    imgResizeShape = imgResize.shape
                    hGap = math.ceil((imgSize - hCal) / 2)
                    imgWhite[hGap:hCal + hGap, :] = imgResize

                prediction = model.predict(imgWhite.reshape(1, 300, 300, 3))
                index = np.argmax(prediction)
                class_name = class_names[index]
                gesture = gesture_names[index]

                # Print prediction and confidence score
                print("Class:", class_name)
                print("Gesture:", gesture)
                # cv2.imshow("ImageCrop", imgCrop)
                # cv2.imshow("ImageWhite", imgWhite)
                
                global gesture_text
                gesture_text = gesture #"Class: " + class_name + ", Gesture: " + gesture
                
                cv2.putText(img, gesture_text, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 0, 0), 2)

                
            except:
                print("Error in try block")

        ret, jpeg = cv2.imencode('.jpg', img)
        frame = jpeg.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
print("4")
@app.route('/')
def index():
    return render_template('app.js')
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
print("5")
if __name__ == "__main__":
    app.run(threaded=True, host="0.0.0.0", port=5003, debug=True)
print("6")
# Release the camera when the app is closed
# cap.release()