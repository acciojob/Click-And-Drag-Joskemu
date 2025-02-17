// Your code here.
// Select all the cubes and the container
const cubes = document.querySelectorAll('.cube');
const container = document.querySelector('.container');

let isDragging = false;
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

// Attach event listeners to each cube for mousedown
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentCube = cube;

    // Get the current position of the cube
    const rect = currentCube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Make the cube appear on top of other cubes
    currentCube.style.zIndex = '10';
  });
});

// Attach event listener to the document to track the mousemove
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  // Calculate the new position for the cube
  const containerRect = container.getBoundingClientRect();
  
  // Calculate the new position based on the mouse coordinates
  let newX = e.clientX - containerRect.left - offsetX;
  let newY = e.clientY - containerRect.top - offsetY;

  // Constrain the movement of the cube within the container
  newX = Math.max(0, Math.min(containerRect.width - currentCube.offsetWidth, newX));
  newY = Math.max(0, Math.min(containerRect.height - currentCube.offsetHeight, newY));

  // Apply the new position to the cube
  currentCube.style.position = 'absolute';
  currentCube.style.left = `${newX}px`;
  currentCube.style.top = `${newY}px`;
});

// Attach event listener to the document to stop the drag on mouseup
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    currentCube.style.zIndex = '1'; // Reset z-index
    currentCube = null; // Reset the current cube reference
  }
});
