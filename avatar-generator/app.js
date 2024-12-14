const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");

const skinColorInput = document.getElementById("skinColor");
const eyeColorInput = document.getElementById("eyeColor");
const mouthStyleInput = document.getElementById("mouthStyle");
const hairStyleInput = document.getElementById("hairStyle");
const hairColorInput = document.getElementById("hairColor");

const randomizeBtn = document.getElementById("randomizeBtn");
const downloadBtn = document.getElementById("downloadBtn");

function drawAvatar() {
  const skinColor = skinColorInput.value;
  const eyeColor = eyeColorInput.value;
  const mouthStyle = mouthStyleInput.value;
  const hairStyle = hairStyleInput.value;
  const hairColor = hairColorInput.value;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Face
  ctx.fillStyle = skinColor;
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2);
  ctx.fill();

  // Draw Eyes
  ctx.fillStyle = eyeColor;
  ctx.beginPath();
  ctx.arc(120, 130, 10, 0, Math.PI * 2);
  ctx.arc(180, 130, 10, 0, Math.PI * 2);
  ctx.fill();

  // Draw Mouth
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 4;
  ctx.beginPath();
  if (mouthStyle === "smile") {
    ctx.arc(150, 170, 30, 0, Math.PI, false);
  } else if (mouthStyle === "neutral") {
    ctx.moveTo(120, 170);
    ctx.lineTo(180, 170);
  } else if (mouthStyle === "frown") {
    ctx.arc(150, 190, 30, Math.PI, 0, true);
  }
  ctx.stroke();

  // Draw Hair
  ctx.fillStyle = hairColor;
  if (hairStyle === "short") {
    ctx.fillRect(100, 50, 100, 50);
  } else if (hairStyle === "curly") {
    ctx.beginPath();
    ctx.arc(150, 80, 50, 0, Math.PI * 2);
    ctx.fill();
  } // Bald has no drawing
}

// Randomize Avatar
function randomizeAvatar() {
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  skinColorInput.value = randomColor();
  eyeColorInput.value = randomColor();
  hairColorInput.value = randomColor();
  const mouths = ["smile", "neutral", "frown"];
  const hairs = ["short", "curly", "bald"];
  mouthStyleInput.value = mouths[Math.floor(Math.random() * mouths.length)];
  hairStyleInput.value = hairs[Math.floor(Math.random() * hairs.length)];
  drawAvatar();
}

// Download Avatar
function downloadAvatar() {
  const link = document.createElement("a");
  link.download = "custom-avatar.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// Event Listeners
skinColorInput.addEventListener("input", drawAvatar);
eyeColorInput.addEventListener("input", drawAvatar);
mouthStyleInput.addEventListener("change", drawAvatar);
hairStyleInput.addEventListener("change", drawAvatar);
hairColorInput.addEventListener("input", drawAvatar);
randomizeBtn.addEventListener("click", randomizeAvatar);
downloadBtn.addEventListener("click", downloadAvatar);

// Initial Draw
drawAvatar();
