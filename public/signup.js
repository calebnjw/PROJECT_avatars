console.log('LOGIN');

const signupButton = document.getElementById('signup-button');
const errorMessage = document.getElementById('error-message');

const submitSignup = async () => {
  errorMessage.innerText = '';

  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  console.log('EMAIL', username, 'PASSWORD', password);

  try {
    const { data } = await axios.post('/user/signup', {
      username,
      password,
    });

    console.log(data);

    if (data.signedUp) {
      window.location.href = '/user/login';
    } else {
      errorMessage.innerText = 'Username must be unique.';
    }
  } catch (error) {
    console.log(error);
  }
};

signupButton.addEventListener('click', submitSignup);
