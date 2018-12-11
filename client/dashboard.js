const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit');

const updateInfo = (username, email) => {
    let data = {
        username,
        email,
    }

    fetch(`http://localhost:3000/api/v1/users/${username}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then((json) => {
        if (json.message) {
            alert('Success!');
            console.log(json);
        }
    })
    .catch((err) => {
        console.log('Something bad happened', err.message);
        alert('Failed');
    })
}

submitBtn.addEventListener('click', (e) => {
    console.log('Press me again');

    let username = usernameInput.value;
    let email = emailInput.value;

    if (username === '' || email === '') {
        alert('Please can you just stop trying break this app? I\'m tired');
        return;
    }

    updateInfo(username, email);
   
})