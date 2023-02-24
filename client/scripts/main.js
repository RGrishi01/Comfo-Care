const btn1 = document.querySelector('#quiz');
btn1.onclick = function() {
    window.location.href = "http://127.0.0.1:5500/client/quiz.html";
}

const btn2 = document.querySelector('#reports');
btn2.onclick = function() {
    window.location.href = "http://127.0.0.1:5500/client/reports.html";
}


const btn3 = document.querySelector('#logout');
btn3.onClick = function() {
    window.localStorage.removeItem("token");
    window.location.href = "http://127.0.0.1:5500/client/login.html";
}
