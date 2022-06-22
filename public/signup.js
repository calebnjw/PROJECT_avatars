console.log('LOGIN');

const signupButton = document.getElementById('signupButton');

const submitLogin = async () => {
  try {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log('EMAIL', email, 'PASSWORD', password);

    const { data } = await axios.post('/users/signup', {
      email,
      password,
    });

    if (data.signedUp) {
      window.location.href = '/login';
    }
  } catch (error) {
    console.log(error);
  }
};

loginButton.addEventListener('click', submitLogin);
