const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit');

const signInUser = (username, email) => {
    let data = {
        username,
        email,
    };

    fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((json) => {
        if (!json.token) {
            console.log('Ohhh which kind wahala be this:', json.message);
            return;
        }
        localStorage.setItem('token', json.token);
        console.log(json.token);
    })
    .catch(err => console.log('Which kind error again na!', err.message));
};

submitBtn.addEventListener('click', (e) => {
    let username = usernameInput.value;
    let email = emailInput.value;

    if (username === '' || email === '') {
        alert('Please can you just stop trying break this app? I\'m tired');
        return;
    }

    signInUser(username, email);
})
