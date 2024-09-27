import cv2
import numpy as np
import os
from collections import deque
from matplotlib import pyplot as plt
import mediapipe as mp
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import TensorBoard
from sklearn.model_selection import train_test_split
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.layers import BatchNormalization, Dropout
# Initialize Mediapipe Holistic and Drawing Utils
mp_holistic = mp.solutions.holistic  # Holistic model
mp_drawing = mp.solutions.drawing_utils  # Drawing utilities


def load_actions(filename='actions.txt'):
    import numpy as np
    with open(filename, 'r') as file:
        actions = [line.strip() for line in file.readlines()]
    return np.array(actions)
# Function for mediapipe detection and conversion
def mediapipe_detection(image, model):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False  # Image is no longer writeable
    results = model.process(image)  # Make prediction
    image.flags.writeable = True  # Image is now writeable
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    return image, results

# Function to draw landmarks
def draw_styled_landmarks(image, results):
    # Draw face connections
    mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION,
                              mp_drawing.DrawingSpec(color=(80,110,10), thickness=1, circle_radius=1),
                              mp_drawing.DrawingSpec(color=(80,256,121), thickness=1, circle_radius=1))
    # Draw pose connections
    mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(80,22,10), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(80,44,121), thickness=2, circle_radius=2))
    # Draw left hand connections
    mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(121,22,76), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(121,44,250), thickness=2, circle_radius=2))
    # Draw right hand connections
    mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=4),
                              mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))

# Function to extract keypoints
def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    face = np.array([[res.x, res.y, res.z] for res in results.face_landmarks.landmark]).flatten() if results.face_landmarks else np.zeros(468*3)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
    return np.concatenate([pose, face, lh, rh])

# Function to visualize predictions
def prob_viz(res, actions, input_frame, colors):
    output_frame = input_frame.copy()
    for num, prob in enumerate(res):
        cv2.rectangle(output_frame, (0, 60 + num * 40), (int(prob * 100), 90 + num * 40), colors[num], -1)
        cv2.putText(output_frame, actions[num], (0, 85 + num * 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
    return output_frame

# Function to initialize model
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

    model.load_weights('action_test.h5')
    return model

# Main function for real-time detection
def run_real_time_detection():
    # Actions to recognize
    actions = load_actions()
    # Assuming actions.txt contains 4 actions
    colors = [(245, 117, 16), (117, 245, 16), (16, 117, 245), (66, 245, 230)]  # Add more colors as needed

    threshold = 0.8

    # Load model
    model = load_model(actions)

    # Initialize variables for detection
    sequence = deque(maxlen=30)
    sentence = []

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
            print(frame.shape)
            # Draw landmarks
            draw_styled_landmarks(image, results)

            # Extract keypoints
            keypoints = extract_keypoints(results)
            sequence.append(keypoints)

            # Only predict if we have 30 frames in the sequence
            if len(sequence) == 30:
                res = model.predict(np.expand_dims(sequence, axis=0))[0]

                # Get predicted action
                action = actions[np.argmax(res)]
                if res[np.argmax(res)] > threshold:
                    if len(sentence) == 0 or action != sentence[-1]:
                        sentence.append(action)
                
                if len(sentence) > 5:
                    sentence = sentence[-5:]

                # Visualize probabilities
                image = prob_viz(res, actions, image, colors)

            # Display the sentence
            cv2.rectangle(image, (0, 0), (640, 40), (245, 117, 16), -1)
            cv2.putText(image, ' '.join(sentence), (3, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

            # Show the image in a window
            cv2.imshow('Real-Time Detection', image)

            # Break gracefully with 'q'
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

if __name__ == "__main__":
    run_real_time_detection()

