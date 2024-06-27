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
    return data; // Return both isSpam and probabilities

  } catch (error) {
    console.error('Error:', error);
    return { isSpam: false, hamProbability: 0, spamProbability: 0 }; // Default values if there's an error
  }
}
async function classifyEmails() {
  const emailElements = document.querySelectorAll('.zA .y6 span[id]');
  emailElements.forEach(async (emailElement) => {
    const emailContent = emailElement.textContent.trim();
    const response = await checkSpam(emailContent);
    const isSpam = response.isSpam;
    const hamProbability = response.hamProbability;
    const spamProbability = response.spamProbability;
    const topSpamWords = response.topSpamWords;

    // Add hover event listener to display probabilities and spam words (conditionally)
    emailElement.addEventListener('mouseenter', () => {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';

      // Build tooltip content
      let tooltipContent = `
        <p>Spam Probability: ${spamProbability.toFixed(3)}%</p>
        <p>Ham Probability: ${hamProbability.toFixed(3)}%</p>
      `;

      // Only display top spam words if spam probability is higher than ham probability
      if (spamProbability > hamProbability) {
        tooltipContent += `<p>Top Spam Words: ${topSpamWords.join(', ')}</p>`;
      }

      tooltip.innerHTML = tooltipContent;
      emailElement.appendChild(tooltip);
    });

    // Remove tooltip on mouse leave
    emailElement.addEventListener('mouseleave', () => {
      const tooltip = emailElement.querySelector('.tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });

    // Highlight spam emails
    if (isSpam) {
      emailElement.closest('.zA').style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // Highlight spam emails
    }
  });
}


document.addEventListener('DOMContentLoaded', classifyEmails);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "classifyEmails") {
    classifyEmails().then(() => sendResponse({ status: "done" }));
    return true; // Will respond asynchronously
  }
});

