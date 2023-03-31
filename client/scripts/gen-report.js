let array = [];
for(let i = 0; i < 7; i++) {
    array[i] = JSON.parse(localStorage.getItem( i+1 ));
}
console.log(array);

// Disease Prediction
if(array[0] == 0){
    if(array[1] == 0 && array[2] == 0 && array[3] == 0) {
        if(array[4] + array[5] + array[6] >= 1) {
            document.querySelector("#disease").innerHTML = "Stomach Bug";
        }
        else {
            document.querySelector("#state").innerHTML = "You are perfectly fine! Probably you need just THIS to shake off your health anxiety?";
            document.querySelector("#yt").innerHTML = `<iframe width="450" height="300" src="https://www.youtube.com/embed/_fWyWcZB7VA"></iframe>`;
        }   
    }
    else if(array[1] + array[2] + array[3] >= 1) {
        document.querySelector("#disease").innerHTML = "Cold";
    }
}
else {
    if(array[1] == 0 && array[2] == 0 && array[3] == 0) {
        document.querySelector("#disease").innerHTML = "Fever";
    }
    else if(array[4] + array[5] + array[6] >= 1) {
        document.querySelector("#disease").innerHTML = "Influenza";
    }
}

if(array[0] + array[1] + array[2] + array[3] + array[4] + array[5] + array[6] !== 0) {
    let b = JSON.parse(localStorage.getItem("a"));
    if(!b) {
        window.localStorage.setItem("a", 1);
        window.location.href = "http://127.0.0.1:5500/client/questions/all.html";
    } else{
        window.localStorage.setItem("a", 0);
        let btn = document.querySelector("#send_report");
        btn.onclick = function() {
            
            alert("Your report has been sent to the hospital and is under review. You will be redirected to the main page.");
            window.location.href = "http://127.0.0.1:5500/client/student_main.html";
        }
    }
}
else {
    document.querySelector("#send_report").innerHTML = "Return to Home Page";
    let btn = document.querySelector("#send_report");
    btn.onclick = function() {
        window.location.href = "http://127.0.0.1:5500/client/student_main.html";
    }
}