let ques_no = [];
let ques_val = [];

let path = window.location.pathname;
let page = path.slice(19,20);
ques_no.push( page );

console.log( path );
console.log( page );
console.log( ques_no );

let next_page = parseInt(page) + 1;

let a = 0;
window.localStorage.setItem("a", 0);

let btn = document.querySelectorAll("#btn");
console.log(btn);
for(let i = 0; i < 3; i++) {
    btn[i].onclick = function() {
        if(next_page == 8) {
            window.location.href = "http://127.0.0.1:5500/client/gen-report.html";
        }
        else {
            window.location.href = "http://127.0.0.1:5500/client/questions/q" + next_page +  ".html";
        }
        window.localStorage.setItem( page, i );
    }
}

const btn1 = document.querySelector('#cancel_quiz');
btn1.onclick = function() {
    window.location.href = "http://127.0.0.1:5500/client/student_main.html";
}
