const btn = document.querySelector('#login');
btn.onclick = function() {
    const inputUsername = document.getElementById('Username');
    const inputPassword = document.getElementById('Password');
    let data = 
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
        body: JSON.stringify(data),
    })
    async function set(response) {
        let res = await response.json();
        if(res.error == true && res.message) {
            alert("Invalid credentials. Please try again.");
        }
        if(res.error == false && res.message) {
            window.location.href = "http://127.0.0.1:5500/reports.html";
        }
    }
}