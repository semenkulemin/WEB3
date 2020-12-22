drawSavedPoints();

picture = document.querySelector(".picture");
submit = document.querySelector(".submit_button");
x_text = document.querySelector(".x_input");
y_text = document.querySelector(".y_input");
r_select = document.querySelector(".r_select");
let r = 0;


Array.prototype.slice.call(document.getElementsByClassName("r_value")).forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains("r_1")) {
            r_select.innerHTML = "1";
        }
        if (button.classList.contains("r_2")) {
            r_select.innerHTML = "2";
        }
        if (button.classList.contains("r_3")) {
            r_select.innerHTML = "3";
        }
        if (button.classList.contains("r_4")) {
            r_select.innerHTML = "4";
        }
        if (button.classList.contains("r_5")) {
            r_select.innerHTML = "5";
        }
    });
});

picture.addEventListener('click', event => {
    let numY;
    let numX;
    const c = picture.getBoundingClientRect();
    //Coordinates in pixels
    let x = event.clientX - c.x;
    let y = event.clientY - c.y;
    if (document.querySelector(".r_select").innerHTML === "") {
        event.preventDefault();
        document.querySelector(".invalid_r").innerHTML = "R is not defined";
    } else {
        //Coordinates in numbers
        r = Number.parseInt(r_select.innerText);
        numX = ((x - 200) * r) / 140;
        numY = (-(y - 200) * r) / 140;
        createPoint(x, y, r);
        sendJSF(numX, numY);
    }
});

function sendJSF(numX, numY) {
    x_text.value = numX;
    y_text.value = numY;
    submit.click();
}
submit.addEventListener('click', (event) => {
    let cx, cy;
    let numX, numY;
    numX = x_text.value.trim().replace(",", ".");
    document.querySelector(".x_input").value = numX;
    numY = y_text.value.trim().replace(",", ".");
    document.querySelector(".y_input").value = numY;

    if (document.querySelector(".r_select").innerHTML === "") {
        event.preventDefault();
        document.querySelector(".invalid_r").innerHTML = "R is not defined";
    } else {
        if (!isNaN(numX) && !isNaN(numY) && !(numX === "") && !(numY === "")){
            if ((numX >= - 5) && (numX <= 5) && (numY >=-3) && (numY <= 3) ) {
                r = Number.parseInt(r_select.innerText);
                document.querySelector(".invalid_r").innerHTML = "";
                cx = 140 * numX / r + 200;
                cy = 200 - 140 * numY / r;
                createPoint(cx, cy, r);
            } else {
                alert("ТОЧКА НЕ ВХОДИТ В ОДЗ");
            }
        } else {
            event.preventDefault();
            document.querySelector(".x_input").value = "";
            document.querySelector(".y_input").value = "";
            alert("ВВОД НЕПРАВИЛЬНЫЙ");
        }
    }
});


function createPoint(x, y, r) {
    let picture = document.querySelector(".picture");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute("r", "3");
    //circle.setAttribute('class', 'points');
    circle.setAttribute("r_input", r.toString());
    if (checkArea(x, y, r)) {
        circle.setAttribute("fill", "#AC3B61");
    } else {
        circle.setAttribute("fill", "#808080");
    }
    picture.appendChild(circle);
}

function checkArea(cx, cy, r) {
    const numX = ((cx - 200) * r) / 140;
    const numY = (-(cy - 200) * r) / 140;
    return ((numY <= 0) && (numY >= -r) && (numX >= 0) && (numX <= r)) || ((numX >= 0) && (numY >= 0) && (numY <= -numX + r / 2)) || ((numX <= 0) && (numY >= 0) && (r ** 2 / 4 >= numX ** 2 + numY ** 2))
}


function drawSavedPoints() {
    let points = getPointsByRows();
    if (null == points) return;
    for (let i in points) {
        if (points[i][1] !== undefined) {
            let x = Number(points[i][0].replace(/,/, '.'));
            let y = Number(points[i][1].replace(/,/, '.'));
            let r = Number(points[i][2].replace(/,/, '.'));
            if (r === Number.parseInt(document.querySelector(".r_select").innerText)) {
                createPoint(140 * x / r + 200, 200 - 140 * y / r, r);
            }
        }
    }
}

function getPointsByRows() {

    let data = [];
    let rows = document.querySelectorAll("#outputTable tbody tr");

    for (let i = 0; i<rows.length; i++){
        data[i] = [];
        let elements = rows[i].childNodes;
        for (let j=0; j<elements.length; j++){
            if (elements[j].firstChild != null){
                data[i].push(elements[j].firstChild.innerText);
            }
        }
    }

    return data;
}
