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
