const canvas = document.getElementById('starCanvas');
const context = canvas.getContext('2d');
const starCounterElement = document.getElementById('starCounter');
let starCount = parseInt(localStorage.getItem('starCount')) || 0;
starCounterElement.textContent = `galaXenes: ${starCount}`;

// Resize the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load saved stars
function loadSavedStars() {
    const savedStars = JSON.parse(localStorage.getItem('stars')) || [];
    savedStars.forEach(starData => {
      const { x, y, size, delay } = starData;
      const starElement = document.createElement('div');
      starElement.classList.add('star');
      starElement.style.left = `${x}px`;
      starElement.style.top = `${y}px`;
      starElement.style.width = `${size}px`;
      starElement.style.height = `${size}px`;
      starElement.style.animationDelay = `${delay}s`;
      document.body.appendChild(starElement);
    });
  }
  

// Function to generate a random position
function randomPosition() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  return { x, y };
}

function spawnStar() {
    const { x, y } = randomPosition();
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
  
    // Random size between 5px and 15px
    const size = Math.random() * 10 + 5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
  
    // Apply a random delay to the twinkle animation
    const delay = Math.random() * 2; // Random delay between 0s and 2s
    star.style.animationDelay = `${delay}s`;
  
    document.body.appendChild(star);
  
    // Increment the counter and update
    starCount++;
    starCounterElement.textContent = `galaXenes: ${starCount}`;
    localStorage.setItem('starCount', starCount);
  
    // Save star position
    saveStars();
  
    // Handle special animations for 100, 500, and 1000 stars
   // if (starCount % 500 === 0) createExplosion();
    // if (starCount % 1000 === 0) createConstellation();
    if (starCount % 100 === 0) spawnMeteorShower();
  }
  

// Save star positions
function saveStars() {
    const stars = document.querySelectorAll('.star');
    const starArray = Array.from(stars).map(star => {
      const rect = star.getBoundingClientRect();
      const size = parseFloat(star.style.width);
      const delay = parseFloat(star.style.animationDelay);
      return {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        size,
        delay
      };
    });
    localStorage.setItem('stars', JSON.stringify(starArray));
  }
  

function spawnMeteorShower() {
    for (let i = 0; i < 100; i++) { // Number of meteors
      setTimeout(() => {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        meteor.style.left = `${Math.random() * window.innerWidth}px`;
        meteor.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(meteor);
  
        // Remove the meteor after the animation
        setTimeout(() => {
          meteor.remove();
        }, 5000); // Match the duration of the meteorShower animation
      }, i * 150); // Delay between meteors
    }
  }
  

// Function to create star explosion (every 500 stars)
/*function createExplosion() {
  for (let i = 0; i < 20; i++) {
    const { x, y } = randomPosition();
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    document.body.appendChild(star);
  }
}

// Function to create constellation flash (every 1000 stars)
function createConstellation() {
  // Create 5 stars in a constellation
  for (let i = 0; i < 5; i++) {
    const { x, y } = randomPosition();
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    document.body.appendChild(star);
  }
  setTimeout(() => {
    document.querySelectorAll('.star').forEach(star => star.remove());
  }, 3000);
}*/

// Click event for spawning stars
canvas.addEventListener('click', () => {
  spawnStar();
});

// Save and Remove stars functionality
document.getElementById('saveStars').addEventListener('click', () => {
  localStorage.setItem('starCount', starCount);
  alert(`galaXenes saved: ${starCount}`);
});

document.getElementById('removeStar').addEventListener('click', () => {
  const stars = document.querySelectorAll('.star');
  if (stars.length > 0) {
    stars[stars.length - 1].remove();
    starCount--;
    starCounterElement.textContent = `galaXenes: ${starCount}`;
    localStorage.setItem('starCount', starCount);
    saveStars();
  }
});

// Clear stars saved in local storage and restart counter
document.getElementById('clearStars').addEventListener('click', () => {
  localStorage.removeItem('stars');
  localStorage.removeItem('starCount');
  alert('galaXenes cleared TT');
  location.reload();
});

// Initialize by loading saved stars
loadSavedStars();
