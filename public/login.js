console.log('LOGIN');

const loginButton = document.getElementById('login-button');
const errorMessage = document.getElementById('error-message');

const submitLogin = async () => {
  errorMessage.innerText = '';

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  console.log('USERNAME', username, 'PASSWORD', password);

  try {
    const { data } = await axios.post('/user/login', {
      username,
      password,
    });

    if (data.loggedIn) {
      window.location.href = '/avatar/create';
    } else {
      errorMessage.innerText = 'Username or password does not match.';
    }
  } catch (error) {
    console.log(error);
  }
};

loginButton.addEventListener('click', submitLogin);
