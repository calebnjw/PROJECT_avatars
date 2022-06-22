console.log('LOGIN');

const loginButton = document.getElementById('loginButton');

const submitLogin = async () => {
  try {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log('USERNAME', email, 'PASSWORD', password);

    const { data } = await axios.post('/users/login', {
      email,
      password,
    });

    if (data.loggedIn) {
      window.location.href = '/avatar';
    }
  } catch (error) {
    console.log(error);
  }
};

loginButton.addEventListener('click', submitLogin);
