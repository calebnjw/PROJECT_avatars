const canvas = document.getElementById('creator-canvas');
const picker = document.getElementById('picker-container');
const avatarSource = document.getElementById('avatar-source');

const resetButton = document.getElementById('reset-button');
const shuffleButton = document.getElementById('shuffle-button');
const saveButton = document.getElementById('save-button');
const downloadButton = document.getElementById('download-button');

const SPRITESHEET = '/images/sprite.png'
const THUMBSIZE = 80;
const CROPSIZE = 320;
const SECTIONS = ['background', 'base', 'face'];

let currentLayer = 0;
let layers = [
  { '0-0': [0, 0] }, // background
  { '0-0': [1, 0] }, // base
  { '0-0': [2, 0] }, // face
];

avatarSource.src = SPRITESHEET;

/**
 * Updates layers
 */
const updateLayer = (layer, part) => {
  console.log('Update!');

  // remove class from old part
  let oldPart = layers[layer]["0-0"];
  const previous = document.getElementById(`${oldPart[0]}-${oldPart[1]}`);
  previous.classList.remove('selected');

  // update layers
  layers[layer]["0-0"] = [layer, part];

  // give class to new part
  let newPart = layers[layer]["0-0"];
  const current = document.getElementById(`${layer}-${part}`);
  current.classList.add('selected');

  drawAvatar();
}

/**
 * resets avatar to default
 */
const resetAvatar = () => {
  console.log('Reset!');

  updateLayer(0, 0);
  updateLayer(1, 0);
  updateLayer(2, 0);
}

const shuffleAvatar = () => {
  console.log('Shuffle!');

  const r1 = Math.floor(Math.random() * 5);
  const r2 = Math.floor(Math.random() * 5);
  const r3 = Math.floor(Math.random() * 5);

  updateLayer(0, r1);
  updateLayer(1, r2);
  updateLayer(2, r3);
}

const exportImage = () => {
  const data = canvas.toDataURL();
  const img = new Image();
  img.src = data;

  var newWindow = window.open("");
  newWindow.document.write(img.outerHTML);
}

resetButton.addEventListener('click', resetAvatar);
shuffleButton.addEventListener('click', shuffleAvatar);
downloadButton.addEventListener('click', exportImage);

/**
 * Creates avatar part picker
 */
const drawPicker = (imgWidth, imgHeight) => {
  // assuming that all parts from the same section are in one row:
  // outer loop: number of rows in the image
  for (let i = 0; i < Math.floor(imgHeight / CROPSIZE); i += 1) {
    const sectionDiv = document.createElement('div'); // create a new div for each section
    sectionDiv.id = `${SECTIONS[i]}-picker`;
    sectionDiv.classList.add(`picker-section`);
    sectionDiv.classList.add('mb-3');
    sectionDiv.classList.add('p-3');

    const sectionTitle = document.createElement('h5'); // create title for each section
    sectionTitle.innerText = `${SECTIONS[i]}`;

    const partGrid = document.createElement('div');
    partGrid.classList.add('part-grid');

    picker.appendChild(sectionDiv);
    sectionDiv.appendChild(sectionTitle);
    sectionDiv.appendChild(partGrid);

    for (let j = 0; j < Math.floor(imgWidth / CROPSIZE); j += 1) {
      const partImage = document.createElement('div');
      partImage.id = `${i}-${j}`
      partImage.classList.add('part');
      partImage.style = `
        background-image: url('${SPRITESHEET}'); 
        width: ${THUMBSIZE}px; 
        height: ${THUMBSIZE}px; 
        background-size: ${THUMBSIZE * 5}px; 
        background-position: ${THUMBSIZE * -j}px ${THUMBSIZE * -i}px
      `
      partImage.addEventListener('click', () => {
        updateLayer(i, j);
      })

      partGrid.appendChild(partImage);
    }
  }
}

// background size should 5x of width and height because there's 5 elements.
// if I make the sprite sheet longer, multiply accordingly.
// move the position of the image using background-position, going in the negative direction.

/**
 * Draws the avatar on the canvas, using layer data
 */
const drawAvatar = () => {
  const ctx = canvas.getContext('2d'); // get 2d context of canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas before drawing

  layers.forEach(layer => { // loop through each layer in the array
    // this is not very necessary for the stage I'm in
    // but will be useful in the future if I decide to add "stickers"
    // that can be placed on different positions on the canvas
    Object.keys(layer).forEach((key) => {
      const [canvasX, canvasY] = key.split("-").map((value) => (Number(value)));
      const [spriteY, spriteX] = layer[key];

      ctx.drawImage(
        avatarSource, // image source
        CROPSIZE * spriteX, CROPSIZE * spriteY, // where from source image to crop
        CROPSIZE, CROPSIZE, // size of image to grab
        CROPSIZE * canvasX, CROPSIZE * canvasY, // where on the canvas to draw (0, 0)
        CROPSIZE, CROPSIZE, // size to draw on canvas
      )
    })
  })
}

avatarSource.onload = () => {
  const sourceWidth = avatarSource.naturalWidth
  const sourceHeight = avatarSource.naturalHeight

  drawPicker(sourceWidth, sourceHeight);

  drawAvatar();

  layers.forEach((layer) => {
    Object.keys(layer).forEach((key) => {
      const [i, j] = layer[key];
      console.log(i, j);
      updateLayer(i, j);
    });
  });
}



// canvas starts with default [{'0-0': [0,1]}, {'0-0': [1,0]}, {'0-0': [1,0]}]
// three layers stacked on top of each other 
// '0-0' indicates position on canvas: [0 * 320, 0 * 320] on the canvas (top left corner)
// [0,1] or [1,4] indicates the position from the sprite sheet to grab image from.

// picker on the left side has to draw one section for each category
// for ( i < length of image / 320 ) create a crop of the image at x = i * 320, and y = j
// clicking on image from picker will replace the corresponding layer
// with the crop from that layer
// then we will redraw the canvas with the image

// download button saves the image and opens in new tab
// save button writes the array to db