import base64
import numpy as np
import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.layers import BatchNormalization, Dropout

def convertImageToCV(base64_str):
    image_data = base64.b64decode(base64_str[23:])
    np_arr = np.frombuffer(image_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    print(frame.shape)
    return frame

def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

# def draw_styled_landmarks(image, results):
#     # Draw face connections
#     mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
#                               mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1),
#                               mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1))
#     # Draw pose connections
#     mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
#                               mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4),
#                               mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2))
#     # Draw left hand connections
#     mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
#                               mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4),
#                               mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2))
#     # Draw right hand connections
#     mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
#                               mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4),
#                               mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))

def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])

def load_model(actions):
    model = Sequential()
    model.add(LSTM(512, return_sequences=True, activation='relu', input_shape=(30, 1662)))
    model.add(BatchNormalization())
    model.add(Dropout(0.27))
    model.add(LSTM(512, return_sequences=True, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(0.27))
    model.add(LSTM(128, return_sequences=False, activation='relu'))
    model.add(BatchNormalization())
    model.add(Dropout(0.27))
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(128, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(4, activation='softmax'))  # Output layer

    model.load_weights('C:/Users/Owner/Desktop/swin_hackathon/SwinHackathon/API/app/users/action_final.h5')
    return model

def run_real_time_detection():
    # Actions to recognize
    actions = load_actions()
    # Assuming actions.txt contains 4 actions 

    threshold = 0.8

    # Load model
    model = load_model(actions)

    # Initialize variables for detection
    sequence = deque(maxlen=30)

    # Open video capture
    cap = cv2.VideoCapture(0)
    
    with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
 #Shape
            # Make detections
            image, results = mediapipe_detection(frame, holistic)


            # Draw landmarks
            #draw_styled_landmarks(image, results)

            # Extract keypoints
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)

            # Only predict if we have 30 frames in the sequence
            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]

                # Get predicted action
                action = actions[np.argmax(res)]
                if res[np.argmax(res)] < threshold:
                    pass
                elif res[np.argmax(res)] > threshold:
                    print(action)

            # Show the image in a window
            cv2.imshow('Real-Time Detection', image)

            # Break gracefully with 'q'
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()