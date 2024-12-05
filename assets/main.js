// Get elements
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtnSecondary = document.getElementById('openModalBtnSecondary');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');

// Open modal
const openModal = () => {
  modal.classList.add('show');
};

// Close modal
const closeModal = () => {
  modal.classList.remove('show');
};

// Add event listeners
openModalBtn.addEventListener('click', openModal);
openModalBtnSecondary.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on pressing Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

/* Form Submission ====================== */

document.getElementById('optinForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const email = document.getElementById('email').value;
  const messageDiv = document.getElementById('message');

  // Clear previous messages
  messageDiv.textContent = '';
  messageDiv.classList.remove('error', 'success', 'loading');

  if (!firstName || !email) {
    messageDiv.textContent = 'Please provide both a first name and an email address.';
    messageDiv.classList.add('error');
    return;
  }

  // Show loading indicator
  messageDiv.textContent = 'Processing your request...';
  messageDiv.classList.add('loading');
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  messageDiv.appendChild(spinner);

  try {
    const response = await fetch('https://mailchimp-backend.onrender.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, email }),
    });

    const data = await response.json();

    if (response.ok) {
      // Success
      messageDiv.textContent = data.message + ' You will be redirected shortly.';
      messageDiv.classList.remove('loading');
      messageDiv.classList.add('success');

      setTimeout(() => {
        window.location.href = data.redirectUrl; // Redirect to the franchising class page
      }, 2000); // Wait 2 seconds before redirect
    } else {
      // Handle different failure scenarios
      if (data.error.title == 'Member Exists') {
        messageDiv.textContent = 'You are already subscribed to our list.';
      } else {
        messageDiv.textContent = data.message + ' ' + data.error.title || 'Subscription failed. Please try again later.';
      }

      messageDiv.classList.remove('loading');
      messageDiv.classList.add('error');
    }
  } catch (error) {
    console.error('Error:', error);
    messageDiv.textContent = 'An error occurred. Please try again later.';
    messageDiv.classList.remove('loading');
    messageDiv.classList.add('error');
  }
});
