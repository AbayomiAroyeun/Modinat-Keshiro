// ─────────── Wear Display Gallery ───────────
const wearDisplay = document.querySelector("#wear-display");
const wearImages = ['image/wear1.png','image/wear2.png','image/wear3.png','image/wear4.png'];
let wearIndex = 0;

function renderWear(){
  wearDisplay.innerHTML = wearImages.map((src, idx)=>
    `<img src="${src}" alt="Design ${idx+1}" class="${idx===wearIndex?'active':''}" data-idx="${idx}">`
  ).join('');
}

function nextWear(){
  wearIndex = (wearIndex + 1) % wearImages.length;
  renderWear();
  const activeImg = wearDisplay.querySelector("img.active");
  if(activeImg) activeImg.scrollIntoView({behavior:"smooth", inline:"center"});
}

renderWear();
setInterval(nextWear, 6000);

// ─────────── Modal Gallery ───────────
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalX = document.getElementById('modal-close');

wearDisplay.addEventListener("click", e=>{
  if(e.target.tagName==="IMG"){
    wearIndex = Number(e.target.dataset.idx);
    renderWear();
    openModal(wearIndex);
  }
});

function openModal(idx){
  modalImg.src = wearImages[idx];
  modal.style.display = 'flex';
}

function closeModal(){
  modal.style.display = 'none';
}

modalX.addEventListener('click', closeModal);
modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });

// ─────────── Move Social Icons on Mobile ───────────
const headerIcons = document.querySelector("#social-icons");
const footerIcons = document.querySelector("#social-icons-footer");

function moveIcons(){
  if(window.innerWidth <=768 && footerIcons.childNodes.length===0){
    footerIcons.innerHTML = headerIcons.innerHTML;
    footerIcons.style.opacity="1";
    footerIcons.style.transform="translateY(0)";
  } else if(window.innerWidth>768){
    footerIcons.style.opacity="0";
    footerIcons.style.transform="translateY(50px)";
    setTimeout(()=> footerIcons.innerHTML='',500);
  }
}
window.addEventListener("resize", moveIcons);
moveIcons();

// ─────────── Animate Footer & Fade Sections ───────────
document.querySelectorAll(".footer-section, .fade-section").forEach((section, idx)=>{
  setTimeout(()=> section.classList.add("visible"), idx*200);
});

// ─────────── Parallax Effect on Wear Display ───────────
function parallaxGallery(){
  const scrollPos = window.scrollY;
  const images = wearDisplay.querySelectorAll("img");
  images.forEach((img, idx)=>{
    const speed = 0.2 + idx*0.05;
    img.style.transform = `translateY(${scrollPos*speed}px) ${img.classList.contains("active") ? "scale(1.05)" : ""}`;
  });
}
window.addEventListener("scroll", parallaxGallery);

// ─────────── Time & User Location Display ───────────
const timeSpan = document.getElementById('time');
const locationSpan = document.getElementById('location');

function updateTimeAndLocation(){
  const now = new Date();
  const hours = now.getHours().toString().padStart(2,'0');
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const options = { weekday:'long', year:'numeric', month:'long', day:'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, options);

  if(timeSpan) timeSpan.textContent = `${formattedDate} | ${formattedTime}`;
}

// Get user location
function getUserLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
        .then(res=>res.json())
        .then(data=>{
          if(locationSpan) locationSpan.textContent = data.address.city || data.address.town || data.address.village || "Unknown";
        }).catch(()=>{ if(locationSpan) locationSpan.textContent="Location Unavailable"; });
    }, ()=>{ if(locationSpan) locationSpan.textContent="Permission Denied"; });
  } else {
    if(locationSpan) locationSpan.textContent="Not Supported";
  }
}

setInterval(updateTimeAndLocation,1000);
updateTimeAndLocation();
getUserLocation();






