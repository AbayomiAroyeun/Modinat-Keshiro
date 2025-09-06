/* =========================================================
   Date & Time Display
========================================================= */
function displayDateTimeLocation() {
  const el = document.getElementById('datetime-location');
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

/* =========================================================
   Spam-safe Email Link
========================================================= */
function buildEmail() {
  const email = 'mkdesignsbymo@gmail.com';
  const link = document.getElementById('email-link');
  if (link) {
    link.href = `mailto:${email}`;
  }
}

/* =========================================================
   Wear-display Gallery
========================================================= */
const wearImages = [
  'image/wear1.png',
  'image/wear2.png',
  'image/wear3.png',
  'image/wear4.png'
];

let wearIndex = 0;

function renderWear() {
  const target = document.getElementById('wear-display');
  target.innerHTML = wearImages.map((src, idx) =>
    `<img src="${src}" alt="Design ${idx + 1}"
      class="${idx=== wearIndex?`active`:``}"
      data-idx="${idx}">`
  ).join('');
}


function nextWear() {
  wearIndex = (wearIndex + 1) % wearImages.length;
  renderWear();
}

/* =========================================================
   Modal Helpers
========================================================= */
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalX = document.getElementById('modal-close');

function openModal(idx) {
  if (!modal || !modalImg) return;
  modalImg.src = wearImages[idx];
  modal.style.display = 'flex';
}

function closeModal() {
  if (!modal) return;
  modal.style.display = 'none';
}

/* =========================================================
   Initialize on Page Load
========================================================= */
window.addEventListener('load', () => {
  displayDateTimeLocation();
  buildEmail();
  renderWear();
  setInterval(nextWear, 6000);

  const wearDisplay = document.getElementById('wear-display');
  if (wearDisplay) {
    wearDisplay.addEventListener('click', e => {
      if (e.target.tagName === 'IMG') {
        wearIndex = Number(e.target.dataset.idx);
        renderWear();
        openModal(wearIndex);
      }
    });
  }

  if (modalX) modalX.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }
});


