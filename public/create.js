// global variables
const SPRITESHEET = '/images/sprite.png';
const THUMBSIZE = 80;
const CROPSIZE = 320;
const SECTIONS = ['background', 'base', 'face'];

const layers = [
  { '0-0': [0, 0] }, // background
  { '0-0': [1, 0] }, // base
  { '0-0': [2, 0] }, // face
];

// dom elements
const canvasContainer = document.getElementById('canvas-container');
const pickerContainer = document.getElementById('picker-container');

// things inside canvas container
const title = document.createElement('h1');
title.innerText = 'Avatar Creator';

const avatarSource = document.createElement('img');
avatarSource.classList.add('d-none');
avatarSource.src = SPRITESHEET;
const canvas = document.createElement('canvas');
canvas.height = CROPSIZE;
canvas.width = CROPSIZE;
canvas.style = 'background-color: white';

const buttonDiv = document.createElement('div');
buttonDiv.classList.add('mt-3');

const resetButton = document.createElement('button');
resetButton.classList.add('btn', 'btn-outline-danger');
resetButton.innerHTML = '<i class="fa-solid fa-arrow-rotate-left"></i> Reset';
const shuffleButton = document.createElement('button');
shuffleButton.classList.add('btn', 'btn-outline-secondary');
shuffleButton.innerHTML = '<i class="fa-solid fa-shuffle"></i> Shuffle';
const downloadButton = document.createElement('button');
downloadButton.classList.add('btn', 'btn-outline-primary');
downloadButton.innerHTML = '<i class="fa-solid fa-download"></i> Download';
const saveButton = document.createElement('button');
saveButton.classList.add('btn', 'btn-outline-primary');
saveButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';

buttonDiv.append(resetButton, shuffleButton, downloadButton, saveButton);

canvasContainer.append(title);
canvasContainer.append(avatarSource);
canvasContainer.append(canvas);
canvasContainer.append(buttonDiv);

// things inside picker container
/**
 * Creates the avatar part picker.
 * @param { number } imgWidth - Original width of the sprite sheet
 * @param { number } imgHeight - Original height of the sprite sheet
 */
const drawPicker = (imgWidth, imgHeight) => {
  // assuming that all parts from the same section are in one row:
  const numOfLayers = Math.floor(imgHeight / CROPSIZE);
  // outer loop: (layer) number of rows in the image
  for (let i = 0; i < numOfLayers; i += 1) {
    // create a new div for each section
    const sectionDiv = document.createElement('div');
    sectionDiv.id = `${SECTIONS[i]}-picker`;
    sectionDiv.classList.add('picker-section');
    sectionDiv.classList.add('mb-3');
    sectionDiv.classList.add('p-3');

    // create title for each section
    const sectionTitle = document.createElement('h5');
    sectionTitle.innerText = `${SECTIONS[i]}`;

    // create a grid for to hold parts in each section
    const partGrid = document.createElement('div');
    partGrid.classList.add('part-grid');

    pickerContainer.appendChild(sectionDiv);
    sectionDiv.appendChild(sectionTitle);
    sectionDiv.appendChild(partGrid);

    const numOfParts = Math.floor(imgWidth / CROPSIZE);
    // inner loop: (part) number of designs in each row
    for (let j = 0; j < numOfParts; j += 1) {
      // empty div that has background showing avatar part
      const partImage = document.createElement('div');
      partImage.id = `${i}-${j}`; // id used to add selected class
      partImage.classList.add('part');
      // background size should 5x of width and height because there's 5 elements.
      // if I make the sprite sheet longer, multiply accordingly.
      // move the position of the image using background-position, going in the negative direction.
      partImage.style = `
        background-image: url('${SPRITESHEET}'); 
        width: ${THUMBSIZE}px; 
        height: ${THUMBSIZE}px; 
        background-size: ${THUMBSIZE * numOfParts}px; 
        background-position: ${THUMBSIZE * -j}px ${THUMBSIZE * -i}px
      `;
      // each div will listen for click, and update layers with their coordinates
      partImage.addEventListener('click', () => {
        updateLayer(i, j);
      });

      partGrid.appendChild(partImage);
    }
  }
};

/**
 * Reads data from global variable layers and draws the avatar on the canvas.
 */
const drawAvatar = () => {
  const ctx = canvas.getContext('2d'); // get 2d context of canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas before drawing

  layers.forEach((layer) => { // loop through each layer in the array
    // this is not very necessary for the stage I'm in
    // but will be useful in the future if I decide to add 'stickers'
    // that can be placed on different positions on the canvas
    Object.keys(layer).forEach((key) => {
      const [canvasX, canvasY] = key.split('-').map((value) => (Number(value)));
      const [spriteY, spriteX] = layer[key];

      ctx.drawImage(
        avatarSource, // image source
        CROPSIZE * spriteX, // where from source image to crop
        CROPSIZE * spriteY, // where from source image to crop
        CROPSIZE, // size of image in X axis to grab
        CROPSIZE, // size of image in Y axis to grab
        CROPSIZE * canvasX, // where on the canvas to draw (0, 0)
        CROPSIZE * canvasY, // where on the canvas to draw (0, 0)
        CROPSIZE, // size to draw in X axis on canvas
        CROPSIZE, // size to draw in Y axis on canvas
      );
    });
  });
};

/**
 * Updated the contents of layers with the new values,
 * and changes appearance of divs to show selected element.
 * @param { number } layer - The index of the section / layer we are drawing on
 * @param { number } part - The index of the part we are updating
 */
const updateLayer = (layer, part) => {
  // remove class from old part
  const oldPart = layers[layer]['0-0'];
  const previous = document.getElementById(`${oldPart[0]}-${oldPart[1]}`);
  previous.classList.remove('selected');

  // update layers
  layers[layer]['0-0'] = [layer, part];

  // give class to new part
  const current = document.getElementById(`${layer}-${part}`);
  current.classList.add('selected');

  drawAvatar();
};

/**
 * Resets the avatar to the initial state,
 * where first items of each section / layer are selected.
 */
const resetAvatar = () => {
  updateLayer(0, 0);
  updateLayer(1, 0);
  updateLayer(2, 0);
};

/**
 * Randomises the avatar.
 */
const shuffleAvatar = () => {
  const r1 = Math.floor(Math.random() * 5);
  const r2 = Math.floor(Math.random() * 5);
  const r3 = Math.floor(Math.random() * 5);

  updateLayer(0, r1);
  updateLayer(1, r2);
  updateLayer(2, r3);
};

/**
 * Exports the canvas image into a png for the user to download.
 */
const exportImage = () => {
  const data = canvas.toDataURL();
  const img = new Image();
  img.src = data;

  const newWindow = window.open('');
  newWindow.document.write(img.outerHTML);
};

/**
 * Passes layer data to the backend to save into db with associated user.
 */
const saveAvatar = async () => {
  const { data } = await axios.post('/avatar/save', {
    avatarContents: layers,
  });

  const { username } = data;

  window.location.href = `/user/${username}`;
};

// once the image source is loaded
avatarSource.onload = () => {
  // get the original width and height of the source spritesheet
  const sourceWidth = avatarSource.naturalWidth;
  const sourceHeight = avatarSource.naturalHeight;

  // pass width and height into drawPicker
  drawPicker(sourceWidth, sourceHeight);
  // then render the avatar
  drawAvatar();

  // updates divs to show selection
  layers.forEach((layer) => {
    Object.keys(layer).forEach((key) => {
      const [i, j] = layer[key];
      updateLayer(i, j);
    });
  });
};

// add event listeners to the buttons on the page
resetButton.addEventListener('click', resetAvatar);
shuffleButton.addEventListener('click', shuffleAvatar);
downloadButton.addEventListener('click', exportImage);
saveButton.addEventListener('click', saveAvatar);
