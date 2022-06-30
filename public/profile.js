// get username from address
const USERNAME = window.location.href.split('/')[4];

const SPRITESHEET = '/images/sprite.png';
const CROPSIZE = 320;

// dom elements
const profileContainer = document.getElementById('profile-container');
profileContainer.classList.add('container');

// things inside profile container
const titleContainer = document.createElement('div');
titleContainer.classList.add('row');
const title = document.createElement('h1');
title.classList.add('text-center');
title.innerText = `${USERNAME}'s avatars!`;

const avatarSource = document.createElement('img');
avatarSource.classList.add('d-none');
avatarSource.src = SPRITESHEET;

const avatarContainer = document.createElement('div');
avatarContainer.classList.add('row', 'justify-content-center');

titleContainer.appendChild(title);
profileContainer.appendChild(titleContainer);
profileContainer.appendChild(avatarContainer);

/**
 * Creates individual html canvas elements with avatar drawn.
 * @return { canvas } - The canvas with drawn avatar.
 */
const renderAvatarCanvas = (layerArray) => {
  const canvas = document.createElement('canvas');
  canvas.height = CROPSIZE;
  canvas.width = CROPSIZE;
  canvas.style = 'background-color: white';

  const ctx = canvas.getContext('2d'); // get 2d context of canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas before drawing

  layerArray.forEach((layer) => { // loop through each layer in the array
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

  return canvas;
};

/**
 * Exports the canvas image into a png for the user to download.
 * @param { number } index - Index of the avatar element displayed on page. Used to select element.
 */
const exportImage = (index) => {
  const canvas = document.getElementById(`canvas-${index}`);
  const data = canvas.toDataURL();
  const img = new Image();
  img.src = data;

  const newWindow = window.open('');
  newWindow.document.write(img.outerHTML);
};

/**
 * Toggles like / unlike on avatar and saves the like information to db.
 * @param { number } index - Index of the avatar element displayed on page. Used to select element.
 * @param { number } avatarId - ID of the avatar in the databse.
 */
const toggleLike = async (index, avatarId) => {
  // select heart icon element by index on page
  const heart = document.getElementById(`heart-${index}`);

  // switch between fa-solid and fa-regular to show whether heart has been liked or not
  // if data-liked="true",
  if (heart.dataset.liked === 'true') {
    // set to false, change from solid to outline icon
    heart.dataset.liked = 'false';
    heart.classList.remove('fa-solid');
    heart.classList.add('fa-regular');

    // send user like information to backend to write into db
    await axios.post('/user/like', { like: false, avatarId });
  } else {
    // do the reverse of the above
    heart.dataset.liked = 'true';
    heart.classList.remove('fa-regular');
    heart.classList.add('fa-solid');

    await axios.post('/user/like', { like: true, avatarId });
  }

  window.location.href = `/user/${USERNAME}`;
};

/**
 * Renders avatars and associated elements on the profile page.
 */
const renderAvatars = async () => {
  const { data } = await axios.get(`/user/get/${USERNAME}`);
  const { avatars, likes } = data;
  const loggedInId = Number(document.cookie.split('; ')[1].split('=')[1]);

  console.log(data);

  if (data.message) {
    avatarContainer.innerText = data.message;
  }

  // I need to extract userIds (likeIds) from information sent by userController (likes):
  // likes is an array representing user likes for the different avatars displayed (avatarArray)
  // each avatar displayed has an array, containing many objects for each row of data in the table
  const likeIds = [];
  likes.forEach((avatarArray) => {
    // if something exists in this array
    if (avatarArray[0]) {
      // create array to store incoming userIds
      const avatarLikes = [];
      avatarArray.forEach((user) => {
        // push userIds to new array
        avatarLikes.push(user.userId);
      });
      // push array of userIds to likdIds
      likeIds.push(avatarLikes);
    } else {
      // else push an empty array
      likeIds.push([]);
    }
  });

  // loop through each avatar in the array
  for (let i = 0; i < avatars.length; i += 1) {
    const { id: avatarId, avatarContents } = avatars[i];

    const card = document.createElement('div');
    card.classList.add('card', 'mb-3', 'mx-1', 'px-3', 'pt-3');

    // draw the avatar from avatarContents
    const avatarCanvas = renderAvatarCanvas(avatarContents);
    avatarCanvas.classList.add('card-img-top');
    avatarCanvas.id = `canvas-${i}`;

    // create container to hold download, heart, and like count
    const likeContainer = document.createElement('div');
    likeContainer.classList.add('card-body', 'd-flex', 'align-items-center', 'justify-content-evenly');

    const downloadButton = document.createElement('button');
    downloadButton.classList.add('btn', 'btn-outline-primary');
    downloadButton.innerHTML = '<i class="fa-solid fa-download"></i>';

    const likeButton = document.createElement('button');
    likeButton.classList.add('btn', 'btn-outline-danger');
    const heart = document.createElement('i');
    heart.id = `heart-${i}`;
    heart.classList.add('red', 'fa-heart');

    // likeCount counts the number of unique ids in likeIds[i]
    const likeCount = document.createElement('div');
    likeCount.innerText = `${likes[i].length}`;

    if (likeIds[i].includes(loggedInId)) {
      heart.dataset.liked = 'true';
      heart.classList.add('fa-solid');
    } else {
      heart.dataset.liked = 'false';
      heart.classList.add('fa-regular');
    }

    downloadButton.append(heart);
    downloadButton.addEventListener('click', async () => {
      // on click, call function toggleLike
      await exportImage(i);
    });
    likeButton.append(heart);
    likeButton.addEventListener('click', async () => {
      // on click, call function toggleLike
      await toggleLike(i, avatarId);
    });
    likeContainer.append(downloadButton, likeButton, likeCount);

    card.appendChild(avatarCanvas);
    card.appendChild(likeContainer);
    avatarContainer.appendChild(card);
  }
};

// once the image source is loaded
avatarSource.onload = () => {
  renderAvatars();
};
