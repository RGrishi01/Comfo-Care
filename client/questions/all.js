let array = [];
for(let i = 0; i < 7; i++) {
    array[i] = JSON.parse(localStorage.getItem( i+1 ));
}

for(let i = 0; i < 7; i++) {
    let option = document.getElementsByClassName("card")[i].querySelectorAll("#btn");
    if(array[i] == 0) {
        option[0].className = "btn btn-primary btn";
    }
    else if(array[i] == 1) {
        option[1].className = "btn btn-primary btn";
    }
    else if(array[i] == 2){
        option[2].className = "btn btn-primary btn";
    }
}

let data;
window.onload = function () {
    const body = this.document.querySelector("body");
    let opt = {
        margin: 0.5,
        filename: 'myfile.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    data = html2pdf().from(body).set(opt).save()
    .then(() => {
        window.location.href = "http://127.0.0.1:5500/client/gen-report.html";
    });
}