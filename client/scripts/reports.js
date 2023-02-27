let btn = document.querySelector("#logout");
console.log("e");
btn.onclick = function() {
    console.log("d");
    window.localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/client/login.html";
}