// Wear Images
const wearImages = [
  'image/wear1.png',
  'image/wear2.png',
  'image/wear3.png',
  'image/wear4.png'
];

// Lazy-load wear images
wearImages.forEach(src => { const img = new Image(); img.src = src; });

const wearDisplay = document.querySelector("#wear-display");
let wearIndex = 0;

function renderWear() {
  wearDisplay.innerHTML = wearImages.map((src, idx) =>
    `<img src="${src}" alt="Design ${idx+1}" class="${idx===wearIndex?'active':''}" data-idx="${idx}" loading="lazy">`
  ).join('');
}

function nextWear() { wearIndex = (wearIndex + 1) % wearImages.length; renderWear(); }

renderWear();
setInterval(nextWear, 6000);

// Modal
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalX = document.getElementById('modal-close');

wearDisplay.addEventListener("click", e => {
  if(e.target.tagName === "IMG") { wearIndex = Number(e.target.dataset.idx); renderWear(); openModal(wearIndex); }
});

function openModal(idx){ modalImg.src = wearImages[idx]; modal.style.display = 'flex'; }
function closeModal(){ modal.style.display = 'none'; }
modalX.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });

// Move Social Icons
const headerIcons = document.querySelector("#social-icons");
const footerIcons = document.querySelector("#social-icons-footer");
function moveIcons(){
  if(window.innerWidth <= 768 && footerIcons.childNodes.length === 0){ footerIcons.innerHTML = headerIcons.innerHTML; }
  else if(window.innerWidth > 768){ footerIcons.innerHTML = ''; }
}
window.addEventListener("resize", moveIcons);
moveIcons();

// Footer & Fade animations
document.querySelectorAll(".footer-section").forEach((section, idx)=>setTimeout(()=>section.classList.add("visible"), idx*200));
document.querySelectorAll(".fade-section").forEach((section, idx)=>setTimeout(()=>section.classList.add("visible"), idx*300));

// Parallax Wear
function parallaxGallery(){ const scrollPos = window.scrollY; wearDisplay.querySelectorAll("img").forEach((img, idx)=>{ const speed = 0.2 + idx*0.05; img.style.transform = `translateY(${scrollPos*speed}px) ${img.classList.contains("active")?"scale(1.05)":""}`; }); }
window.addEventListener("scroll", parallaxGallery);

// Time & Location
const timeSpan = document.getElementById('time');
const locationSpan = document.getElementById('location');

async function getLocationName(lat, lon){
  try{
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await res.json();
    return `${data.address.city||data.address.town||data.address.village||''}, ${data.address.state||''}, ${data.address.country||''}`;
  } catch { return "Abeokuta, Ogun State, Nigeria"; }
}

function updateTimeAndLocation(){
  const now = new Date();
  const formattedTime = now.toTimeString().split(' ')[0];
  const formattedDate = now.toLocaleDateString(undefined,{ weekday:'long', year:'numeric', month:'long', day:'numeric' });

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async pos => {
      locationSpan.textContent = await getLocationName(pos.coords.latitude,pos.coords.longitude);
    }, ()=>{ locationSpan.textContent = "Abeokuta, Ogun State, Nigeria"; });
  } else { locationSpan.textContent = "Abeokuta, Ogun State, Nigeria"; }

  if(timeSpan){ timeSpan.textContent = `${formattedDate} | ${formattedTime}`; }
}

setInterval(updateTimeAndLocation, 1000);
updateTimeAndLocation();

// Swipe Gestures
let startX = 0;
wearDisplay.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
wearDisplay.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  if(endX - startX > 50) wearIndex = (wearIndex-1+wearImages.length)%wearImages.length;
  else if(startX - endX > 50) wearIndex = (wearIndex+1)%wearImages.length;
  renderWear();
});






