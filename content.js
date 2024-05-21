async function checkSpam(emailContent) {
  try {
    const response = await fetch('http://127.0.0.1:5000/check_spam', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: emailContent })
    });
    const data = await response.json();
    return data.isSpam;
  } catch (error) {
    console.error('Error:', error);
    return false; // Default to not spam if there's an error
  }
}

async function classifyEmails() {
  const emailElements = document.querySelectorAll('.zA .y6 span[id]');
  for (let email of emailElements) {
    const emailContent = email.textContent;
    const isSpam = await checkSpam(emailContent);
    if (isSpam) {
      email.closest('.zA').style.backgroundColor = 'red'; // Highlight spam emails
    }
  }
}

document.addEventListener('DOMContentLoaded', classifyEmails);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "classifyEmails") {
    classifyEmails().then(() => sendResponse({status: "done"}));
    return true; // Will respond asynchronously
  }
});
