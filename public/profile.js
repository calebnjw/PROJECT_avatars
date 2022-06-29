const profileContainer = document.getElementById('profile-container');

console.log();

// how to get the username from the current page url???
console.log('window search', window.location.search);

console.log('url search', new URLSearchParams().keys());
console.log(window.location.href);
console.log(window.location.href.split('/')[4]);

// using username from url, 
// do axios get request user/:username to find user id
// then axios get request to avatar/:id to find all avatars associated with id
// const avatars = axios.get('/avatar/id????? ');
