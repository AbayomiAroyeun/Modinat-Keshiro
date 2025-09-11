document.addEventListener("DOMContentLoaded", () => {

  // ───────── Wear Display Gallery ─────────
  const wearDisplay = document.getElementById("wear-display");
  const wearImages = ['image/wear1.png','image/wear2.png','image/wear3.png','image/wear4.png'];
  let wearIndex = 0;

  function renderWear(){
    if(!wearDisplay) return;
    wearDisplay.innerHTML = wearImages.map((src, idx)=>
      `<img src="${src}" alt="Design ${idx+1}" class="${idx===wearIndex?'active':''}" data-idx="${idx}" loading="lazy">`
    ).join('');
  }

  renderWear();
  setInterval(()=>{ wearIndex = (wearIndex+1)%wearImages.length; renderWear(); }, 6000);

  // ───────── Modal Gallery ─────────
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

  function openModal(idx){ modalImg.src = wearImages[idx]; modal.style.display='flex'; }
  function closeModal(){ modal.style.display='none'; }

  modalX.addEventListener('click', closeModal);
  modal.addEventListener('click', e=>{ if(e.target===modal) closeModal(); });

  // ───────── Move Social Icons on Mobile ─────────
  const headerIcons = document.querySelector("#social-icons");
  const footerIcons = document.querySelector("#social-icons-footer");
  function moveIcons(){
    if(window.innerWidth <= 768){ footerIcons.innerHTML = headerIcons.innerHTML; }
    else{ footerIcons.innerHTML = ''; }
  }
  window.addEventListener("resize", moveIcons);
  moveIcons();

  // ───────── Animate Footer Sections ─────────
  const footerSections = document.querySelectorAll(".footer-section");
  footerSections.forEach((section, idx)=>{ setTimeout(()=>section.classList.add("visible"), idx*200); });

  // ───────── Fade-in Sections ─────────
  const fadeSections = document.querySelectorAll(".fade-section");
  fadeSections.forEach((section, idx)=>{ setTimeout(()=>section.classList.add("visible"), idx*300); });

  // ───────── Time and Location Display ─────────
  const timeSpan = document.getElementById('time');
  const locationSpan = document.getElementById('location');

  function updateTimeAndLocation(){
    if(!timeSpan || !locationSpan) return;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    const formattedDate = now.toLocaleDateString(undefined,{ weekday:'long', year:'numeric', month:'long', day:'numeric' });
    timeSpan.textContent = `${formattedDate} | ${formattedTime}`;

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(pos=>{
        const lat=pos.coords.latitude, lon=pos.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
          .then(res=>res.json())
          .then(data=>{ locationSpan.textContent = data.address.city || data.address.town || data.address.village || "Unknown Location"; })
          .catch(()=>{ locationSpan.textContent="Location Unavailable"; });
      },()=>{ locationSpan.textContent="Location Permission Denied"; }, {timeout:5000});
    } else { locationSpan.textContent="Location Not Supported"; }
  }

  setInterval(updateTimeAndLocation,1000);
  updateTimeAndLocation();

});






