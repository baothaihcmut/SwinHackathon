from typing import List
from .utils import convertImageToCV
from .utils import load_model, extract_keypoints, mediapipe_detection
import numpy as np
import mediapipe as mp



class LoadImageService(object):
    def __init__(self) -> None:
        self.images = {}
    def loadImage(self,sid,image):
        if sid in self.images:
            self.images[sid].append(image)
        else:
            self.images[sid] = []
    
    def getImages(self, sid):
        if sid not in self.images:
            return None
        return self.images[sid]
    
    def clearCache(self,sid):
        if sid not in self.images:
            return
        del self.images[sid]

class ImagePredictService(object):
    def __init__(self, model= None) -> None:
        self.model = model
        self.mp_holistic = mp.solutions.holistic
    def process(self,images, threshold=0.8):
        process_imgs = list(map(lambda image: convertImageToCV(image), images))
        with self.mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
            sequence = []
            for image in process_imgs:
                image, results = mediapipe_detection(image, holistic)
                keypoints = extract_keypoints(results)
                sequence.append(keypoints)
                print(sequence)
            res = self.model.predict(np.expand_dims(sequence, axis=0))[0]
            actions=np.array(['Hello','Love you', 'You', 'Happy'])
            action = actions[np.argmax(res)]
            if res[np.argmax(res)] > threshold:
                return action
            elif res[np.argmax(res)] < threshold:
                return "None"
    
class ProcessImageService(object):
    def __init__(self) -> None:
        self.image_predicter = ImagePredictService(model= load_model(np.array(['Hello','Love you', 'You', 'Happy'])))
        self.image_loader=LoadImageService()
        self.lock = False
    def process(self, sid, image):
        if not self.lock:
            self.image_loader.loadImage(sid, image)
            if self.image_loader.getImages(sid) and len(self.image_loader.getImages(sid)) == 30:
                self.lock = True
                res = self.image_predicter.process(self.image_loader.getImages(sid))
                self.image_loader.clearCache(sid)
                self.lock = False
                return res
        return None

imageProcessService = ProcessImageService()
        

