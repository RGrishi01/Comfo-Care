const btn = document.querySelector('#login');
btn.onclick = function() {
    const inputUsername = document.getElementById('Username');
    const inputPassword = document.getElementById('Password');
    let {username, password} = 
    { 
        "username": inputUsername.value,
        "password": inputPassword.value
    }
    console.log(inputUsername.value);
    console.log(inputPassword.value);
    fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password}),
    })
}