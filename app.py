from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and vectorizer
with open('naive_bayes_model.pkl', 'rb') as f:
    NB_classifier = pickle.load(f)

with open('vectorizer.pkl', 'rb') as f:
    vectorizer = pickle.load(f)

@app.route('/check_spam', methods=['POST'])
def check_spam():
    if request.is_json:
        data = request.get_json()
        email_content = data['content']
        email_vectorized = vectorizer.transform([email_content])
        prediction = NB_classifier.predict(email_vectorized)
        is_spam = bool(prediction[0])  # Convert numpy.bool_ to Python bool
        return jsonify({'isSpam': is_spam})
    else:
        return jsonify({'error': 'Request content type must be application/json'}), 415

if __name__ == '__main__':
    app.run(debug=True)
