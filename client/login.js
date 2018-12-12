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
            console.log('An error occured', json.message);
            return;
        }
        localStorage.setItem('token', json.token);
        console.log(json.token);
        window.location.href = 'dashboard.html';
    })
    .catch(err => console.log('An error occured', err.message));
};

submitBtn.addEventListener('click', (e) => {
    let username = usernameInput.value;
    let email = emailInput.value;

    if (username === '' || email === '') {
        alert('Please fill all fields');
        return;
    }

    signInUser(username, email);
})
