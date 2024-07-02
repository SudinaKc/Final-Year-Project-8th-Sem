# Gmail Spam Classifier Chrome Extension

### 🚀 Overview
The Gmail Spam Classifier is a Chrome extension designed to classify and flag spam emails in Gmail using machine learning. This extension integrates with a Naive Bayes classifier model, which was trained on a labeled dataset to distinguish between spam and ham (non-spam) emails.

---

### ✨ Features
- Classifies Gmail emails as spam or ham.
- Highlights spam emails in red for easy identification.
- Displays spam and ham probabilities on hover.
- Shows the top 5 words contributing to the spam classification.

---

### 🛠 Technology Stack
- **Backend:** Python, Flask, scikit-learn
- **Frontend:** HTML, CSS, JavaScript
- **Libraries:** Flask-CORS, NumPy, Pickle

---

### 📦 Installation

#### Backend Setup
1. Clone the repository:
  
2. Install dependencies:
    ```
    pip install flask flask-cors scikit-learn numpy
    ```
3. **Start the Flask server:**
    ```bash
    python app.py
    ```

---

### Chrome Extension Setup

1. Go to the `project` folder.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the `frontend` folder.
5. The extension is now ready to use.

---

### 📝 Usage

1. Open Gmail in Chrome.
2. Click on the extension icon in the Chrome toolbar.
3. Click on the **Classify Emails** button in the extension popup.
4. The extension automatically scans emails in your inbox.
5. Spam emails are highlighted in red.
6. Hover over an email to see:
   - Spam and ham probabilities.
   - The top spam words contributing to the classification.

---
### 📸 Screenshots
1. **Clicking on "Classify Emails" in the Extension**:
![chormeExtension (1)](https://github.com/user-attachments/assets/68ae9c9b-3b01-486e-aec7-26d45033f150)

2. **on hover**:

![image](https://github.com/user-attachments/assets/f9e44a76-4a88-43b8-b3e4-b5a01c687712)

3. **mail detail page**
![Untitled](https://github.com/user-attachments/assets/b6ea0b29-b236-4de6-9812-f18ef23f3763)











