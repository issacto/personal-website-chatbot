import time
from flask import Flask, render_template, Response, request
import cv2
import os
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer

import numpy as np
import base64
import json
from secrets import secrets

#import keras 
#print(keras.__version__)
from keras.models import model_from_json,load_model
from keras.preprocessing.image import img_to_array

tempModel = open("model.json", "r").read()
model = model_from_json(tempModel)
model.load_weights('model.h5')

face_haar_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')




#Training BankBot

bot = ChatBot("Toto",logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'threshold': 0.6,
            'default_response': 'I am afraid I dont understand your question!'
        }])
trainer = ListTrainer(bot)
trainer.train(secrets)


app = Flask(__name__, static_folder='/client/build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/getMessage', methods=['GET'])
def get_bot_response():
    userText = request.args.get('message')
    botReply = str(bot.get_response('default_response'))
    if botReply is "default_value":
        botReply = str(bot.get_response('default_response'))
    if(botReply =="Opening Personal Website"):
        return {'message': botReply,'personalWebsiteTrigger':'https://issacto.netlify.app'}
    if(botReply == "Opening Github"):
        return {'message': botReply,'personalWebsiteTrigger':'https://github.com/issacto'}
    if(botReply == "Opening Tubafingering"):
        return {'message': botReply,'personalWebsiteTrigger':'https://tubafingering.netlify.app/'}
    if(botReply == "Opening Kowloon Carpark Data"):
        return {'message': botReply,'personalWebsiteTrigger':'https://issacto.github.io/KowloonWestParking/'}
    if(botReply == "Steins Gate!"):
        return {'message': botReply,'personalWebsiteTrigger':'https://en.wikipedia.org/wiki/Steins;Gate'}
    return {'message': botReply}


@app.route('/getSelfie', methods=['POST'])
def getSelfie():
    data = request.data.decode('utf-8')
    jsonData = json.loads(data)
    b64_string = base64.b64decode(jsonData["data"][23:])
    np_data = np.fromstring(b64_string,np.uint8)
    converted_image = cv2.imdecode(np_data,cv2.IMREAD_UNCHANGED)

    converted_image= cv2.cvtColor(converted_image, cv2.COLOR_BGR2GRAY)
    #cv2.imwrite("abc.jpg",converted_image)
    
    faces_detected = face_haar_cascade.detectMultiScale(converted_image)
    #print("faces_detected")
    #print(faces_detected)
    image_pixels=0
    for (x,y,w,h) in faces_detected:
        cv2.rectangle(converted_image,(x,y), (x+w,y+h), (255,0,0))
        roi_gray=converted_image[y:y+w,x:x+h]
        roi_gray=cv2.resize(roi_gray,(48,48))
        image_pixels = img_to_array(roi_gray)
        image_pixels = np.expand_dims(image_pixels, axis = 0)

    max_index = 6
    if(type(image_pixels) != int):
        #predictions = model.predict(image_pixels)
        #max_index = np.argmax(predictions[0])
        max_index=1
    
    emotion_detection = ('angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral')
    emotion_prediction = emotion_detection[max_index]
    #print(emotion_prediction, file=sys.stdout)
    #emotion_prediction=emotion_prediction
    return {'message': emotion_prediction}







if __name__ == '__main__':
     port = int(os.environ.get('PORT', 5000))
     app.run(host='0.0.0.0', port=port)