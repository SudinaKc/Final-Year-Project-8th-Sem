from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model and vectorizer
with open("naive_bayes_model.pkl", "rb") as f:
    NB_classifier = pickle.load(f)

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)


@app.route("/check_spam", methods=["POST"])
def check_spam():
    if request.is_json:
        data = request.get_json()
        email_content = data["content"]

        # Vectorize the email content
        email_vectorized = vectorizer.transform([email_content])

        # Predict whether the email is spam
        prediction = NB_classifier.predict(email_vectorized)
        is_spam = bool(prediction[0])  # Convert numpy.bool_ to Python bool

        # Get the prediction probabilities
        prediction_proba = NB_classifier.predict_proba(email_vectorized)
        spam_probability = round(prediction_proba[0][1], 3)  # Probability of spam
        ham_probability = round(prediction_proba[0][0], 3)  # Probability of ham

        # Get the feature names (words) and their corresponding log probabilities
        feature_names = np.array(vectorizer.get_feature_names_out())
        log_probs_spam = NB_classifier.feature_log_prob_[1]  # Log probabilities for spam class
        log_probs_ham = NB_classifier.feature_log_prob_[0]  # Log probabilities for ham class

        # Extract the non-zero word indices from the vectorized email
        email_word_indices = email_vectorized.nonzero()[1]
        email_words = feature_names[email_word_indices]

        # Calculate spam contribution for words in this specific email
        word_spam_scores = log_probs_spam[email_word_indices]
        top_spam_indices = np.argsort(word_spam_scores)[::-1][:5]  # Top 5 indices
        top_spam_words = email_words[top_spam_indices]

        return jsonify(
            {
                "isSpam": is_spam,
                "spamProbability": spam_probability,
                "hamProbability": ham_probability,
                "topSpamWords": list(top_spam_words),  # Return the top 5 spam words for this email
            }
        )
    else:
        return jsonify({"error": "Request content type must be application/json"}), 415


if __name__ == "__main__":
    app.run(debug=True)
