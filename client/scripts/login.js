window.onload = function (e) {
    window.localStorage.clear();
}

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
    }).then((response) => response.json())
    .then((res) => {
        console.log(res);
        if(res.error == true) {
            alert("Invalid credentials. Please try again.");
        }
        if(res.error == false && res.role === "student") {
            window.localStorage.setItem("token", res.token);
            window.location.href = "http://127.0.0.1:5500/client/student_main.html";
        }
        if(res.error == false && res.role === "hospital") {
            window.localStorage.setItem("token", res.token);
            window.location.href = "http://127.0.0.1:5500/client/hospital_main.html";
        }    
    })
}