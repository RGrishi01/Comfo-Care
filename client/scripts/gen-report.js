let btn = document.querySelector("#send_report");
// console.log("e");
btn.onclick = function() {
    // console.log("d");
    
    alert("Your report has been sent to the hospital and is under review. You will be redirected to the main page.");
    window.location.href = "http://127.0.0.1:5500/client/student_main.html";
}