let array = [];
for(let i = 0; i < 8; i++) {
    array[i] = JSON.parse(localStorage.getItem( i+1 ));
}
console.log(array);

// Disease Prediction
if(array[0] == 1 || array[0] == 2){
    if(array[1] == 0 && array[2] == 0 && array[3] == 0) {
        
    }
}

let btn = document.querySelector("#send_report");
btn.onclick = function() {
    
    alert("Your report has been sent to the hospital and is under review. You will be redirected to the main page.");
    window.location.href = "http://127.0.0.1:5500/client/student_main.html";
}