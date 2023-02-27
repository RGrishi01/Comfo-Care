let ques_no = [];
let ques_val = [];

let path = window.location.pathname;
let page = path.slice(19,20);
ques_no.push( page );

console.log( path );
console.log( page );
console.log( ques_no );

let btn = document.querySelectorAll("#id");
btn.onclick = function() {
    check[2].checked = true;
}

let next_page = parseInt(page) + 1;
// document.getElementsByName("exampleRadios").addEventListener("change", myFunction);

let check = document.getElementsByName("exampleRadios");
check[1].checked = true;
if(check[0].checked == true) {
    console.log(check);
    myFunction();
}

function myFunction() {
    ques_val.push();
    console.log("onchange");
    window.location.href = "http://127.0.0.1:5500/client/questions/q" + next_page +  ".html";
}

console.log( ques_val );
console.log("http://127.0.0.1:5500/client/questions/q" + next_page +  ".html"); 
