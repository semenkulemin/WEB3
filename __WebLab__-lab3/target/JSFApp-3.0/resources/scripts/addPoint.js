picture = document.getElementById("picture");
submit_button = document.getElementById("form:submit_button");
x_input = document.getElementById("form:x_input");
y_input = document.getElementById("form:y_input");
invalid = document.getElementById("invalid");
const r_input = document.getElementById("form:r_input");
const array_of_r = [1, 2, 3, 4, 5];

drawSavedPoints();
r_input.addEventListener('change', (event) => {
    document.querySelectorAll(".drawn_point").forEach(value => {
        value.remove();
    });
    drawSavedPoints();
});


picture.addEventListener('click', (event) => {

    let r = r_input.value;
    const c = picture.getBoundingClientRect();
    //Coordinates in pixels
    let cx = event.clientX - c.x;
    let cy = event.clientY - c.y;
    let x = ((cx - 200) * r) / 140;
    let y = (-(cy - 200) * r) / 140;
    x_input.value = Number(x).toFixed(4);
    y_input.value = Number(y).toFixed(4);
    submit_button.click();
});

submit_button.addEventListener('click', (event) => {
    let x = x_input.value.trim().replace(",", ".");
    let y = y_input.value.trim().replace(",", ".");
    let r = r_input.value;
    if (validation(x, y, r)) {
        createPoint(x, y, r);
    } else {
        invalid.innerHTML += "Change it.";
        event.preventDefault();
    }
});

function createPoint(x, y, r) {
    let cx = (140 * x / r) + 200;
    let cy = 200 - y * 140 / r;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute("r", "3");
    circle.setAttribute("r_input", r.toString());
    circle.setAttribute("class", "drawn_point");
    if (checkArea(x, y, r)) {
        circle.setAttribute("fill", "#AC3B61");
    } else {
        circle.setAttribute("fill", "#808080");
    }
    picture.appendChild(circle);

}

function checkArea(x, y, r) {
    return ((y <= 0) && (y >= -r) && (x >= 0) && (x <= r)) || ((x >= 0) && (y >= 0) && (y <= -x + r / 2)) || ((x <= 0) && (y >= 0) && (r * r / 4) >= (y * y + x * x))
}

function validation(x, y, r) {
    let flag = true;
    invalid.innerHTML = "";
    if (!((x > -5) && (x <= 5)) || (x === undefined) || isNaN(x) || (x === "")) {
        invalid.innerHTML = "Invalid X. ";
        flag = false;
    }
    if (!((y > -3) && (y <= 3)) || (y === undefined) || isNaN(y) || (y === "")) {
        invalid.innerHTML += "Invalid Y. ";
        flag = false;
    }
    if ((array_of_r.indexOf(r) == null)) {
        invalid.innerHTML += "Invalid R. ";
        flag = false;
    }
    return flag;
}

function drawSavedPoints() {
    let points = getPointsByRows();
    console.log(points);
    if (null == points) return;
    for (let i in points) {
        if (points[i][1] !== undefined) {
            let x = Number(points[i][0].replace(/,/, '.'));
            let y = Number(points[i][1].replace(/,/, '.'));
            //let r = Number(points[i][2].replace(/,/, '.'));
            createPoint(x, y, r_input.value);
        }
    }
}

function getPointsByRows() {
    let data = [];
    let rows = document.querySelectorAll("#output_table tbody tr");

    for (let i = 0; i < rows.length; i++) {
        data[i] = [];
        let elements = rows[i].childNodes;
        for (let j = 0; j < elements.length; j++) {
            if (elements[j].firstChild != null) {
                data[i].push(elements[j].firstChild.innerText);
            }
        }
    }

    return data;
}