# Personal-website-chatbot
About: To serve as my personal website chatbot 

<hr/>
 
 
### Features
* Mirror (NLP Sentiment Analysis) increasing user experience (only sensitive to neutral, happy, and surprise)
* Chatbot (Python Chatterbot) introducing the author
* Chat without typing

### Development
* React
* Flask
* Node
* Python

### Run


1. Train a DNN Sentiment Analysis 
* link: https://analyticsindiamag.com/my-first-cnn-project-emotion-detection-using-convolutional-neural-network-with-tpu/ 

2. Create your chatterbot secret file
``` python
secrets = [
    "Who are you?",
    "I am Toto...",
] 
```
3. Backend: Install pip and node packages
``` javascript
python3 -m venv env
//pip install missing packages 
```
``` javascript
cd client
npm install
npm run build
```

4. Run:
``` javascript
gunicorn app:app
```

5. Use Chrome to run the website (some packages dont work well with Safari)

### Fail to deploy on Heroku
* Heroku free deployment memory is only 500MB.
* Machine learning model takes around 130MB, NPM Build takes and pip packages take another 200MB (+other runtime storage). Therefore, it is impossible to deploy it freely on heroku.



