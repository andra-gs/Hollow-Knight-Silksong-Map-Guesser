const screenshots = [
  { src: "image/image.png", x: 150, y: 220 },
  { src: "image/image.png", x: 300, y: 100 },
  { src: "image/image.png", x: 90, y: 340 }
];

const screenshotImg = document.getElementById("screenshot-img");
const map = document.getElementById("map");
const pin = document.getElementById("pin");
const result = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

let current = 0;
let hasGuessed = false;

function loadScreenshot() {
  const shot = screenshots[current];
  screenshotImg.src = shot.src;
  result.textContent = "Click on the map to guess.";
  pin.style.display = "none";
  hasGuessed = false;
}

// klik di map
map.addEventListener("click", (e) => {
  if (hasGuessed) return;
  const rect = map.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  // tampilkan pin
  pin.style.left = `${clickX}px`;
  pin.style.top = `${clickY}px`;
  pin.style.display = "block";

  // koordinat sebenarnya
  const target = screenshots[current];
  const dx = clickX - target.x;
  const dy = clickY - target.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  result.textContent = `Jarak tebakanmu: ${Math.round(distance)} piksel.`;
  hasGuessed = true;
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % screenshots.length;
  loadScreenshot();
});

loadScreenshot();

