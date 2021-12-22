function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);

    // use parent to get div id
    // var id = $(this).closest('div.pane').attr('id');
    // console.log(id);
    // use div id to identify corresponding array
    // for (let i = 0; i < sem.length; i++) {
    //     if (sem[i].code == ev.target.id) {
    //         sem.pop(sem[i]);
    //     }
    // }
}

function drop(ev, sem) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("data :" + data);
    ev.target.appendChild(document.getElementById(data));

    // document.getElementById(data).style.backgroundColor = color(document.getElementById(data).areas);

    // for (let i = 0; i < 8; i++) {
    //     for (let j = 0; j < sem.length; j++) {
    //         if (sem[i].code == ev.target.id) {
    //             sem.pop(sem[i]);
    //         }
    //     }
    // }

    // switch(sem) {
    //     case("fall1") : fall1.push(data); break;
    //     case("spring1") : spring1.push(data); break;
    //     case("fall2") : fall2.push(data); break;
    //     case("spring2") : spring2.push(data); break;
    //     case("fall3") : fall3.push(data); break;
    //     case("spring3") : spring3.push(data); break;
    //     case("fall4") : fall4.push(data); break;
    //     case("spring4") : spring4.push(data); break;
    // }

    // console.log(fall1);
    // console.log(fall2);
    // move course to dictionary object respective to semester
    // add to new object, remove from old object
    // calculate semester's new credit total
    // if semester's new credit total > allowance based on ksas / wse, display warning
}

let fall1 = [{"code" : "EN500112", "title" : "Gateway Computing: JAVA", "credits" : 3, "areas" : "E", "sem" : "fall1"}, {"code" : "EN601104", "title" : "Computer Ethics", "credits" : 1, "areas" : "H", "sem" : "fall1"}];
let spring1 = [{"code" : "EN601220", "title" : "Intermediate Programming", "credits" : 4, "areas" : "E", "sem" : "spring1"}];
let fall2 = [{"code" : "EN601226", "title" : "Data Structures", "credits" : 4, "areas" : "E", "sem" : "fall2"},{"code" : "EN601230", "title" : "Mathematical Foundations for CS", "credits" : 4, "areas" : "Q", "sem" : "spring2"}];
let spring2 = [{"code" : "EN601229", "title" : "Computer System Fundamentals", "credits" : 3, "areas" : "E", "sem" : "fall3"}];
let fall3 = [{"code" : "EN601443", "title" : "Intro to Algorithms", "credits" : 3, "areas" : "E", "sem" : "fall4"}];
let spring3 = [];
let fall4 = [];
let spring4 = [];

// calculate semester's new credit total & total credit total
// assigns color based on areas, also checks major req based on areas

function addCourse(code, title, credits, areas) {
    let digit = parseInt(code.substring(code.length - 3));

    let obj;
    let year;
    let sem;

    let codeid = code.substring(0, 2) + code.substring(3, 6) + code.substring(7);

    if (digit < 200) {
        // freshman
        year = 1;
        obj = {"code" : code, "title" : title, "credits" : credits, "areas" : areas, "sem" : "fall1"};
        fall1.push(obj);
        document.getElementById("cfall1").innerHTML = calculateCredits(fall1) + " credits";
    } else if (digit < 300) {
        // sophomore
        year = 2;
        obj = {"code" : code, "title" : title, "credits" : credits, "areas" : areas, "sem" : "fall2"};
        fall2.push(obj);
        document.getElementById("cfall2").innerHTML = calculateCredits(fall2) + " credits";
    } else if (digit < 400) {
        // junior
        year = 3;
        obj = {"code" : code, "title" : title, "credits" : credits, "areas" : areas, "sem" : "fall3"};
        fall3.push(obj);
        document.getElementById("cfall3").innerHTML = calculateCredits(fall3) + " credits";
    } else {
        // senior
        year = 4;
        obj = {"code" : code, "title" : title, "credits" : credits, "areas" : areas, "sem" : "fall4"};
        fall4.push(obj);
        document.getElementById("cfall4").innerHTML = calculateCredits(fall4) + " credits";
    }

    document.getElementById("fall" + year).innerHTML +=
            `<div class="card drag" id="${codeid}" draggable="true" ondragstart="drag(event)">
                <button class="delete is-small" onclick="deleteCourse(\'${codeid}\');" style="display: none;"></button>
                <div class="card-content">
                    ${code}<br>
                    ${title} (${credits})
                </div>
            </div>`;
    
    document.getElementById(codeid).style.backgroundColor = color(areas);
    document.getElementById("filter-records").innerHTML = '';
    document.getElementById("txt-search").value = '';
}

function calculateCredits(sem) {
    let sum = 0;
    for (i = 0; i < sem.length; i++) {
        sum += parseInt(sem[i].credits);
    }
    return sum;
}

function color(areas) {
    const array = [];
    for (let i=0; i < areas.length; i++){
       array.push(areas.charAt(i));
    }
    
    let r = 0;
    let g = 0;
    let b = 0;

    if (areas.includes('H')) { // red
        r = 249;
        g = 111;
        b = 111;
    }

    if (areas.includes('N')) { // green
        if (r != 0) {
            r = (r + 91) / 2;
            g = (g + 226) / 2;
            b = (b + 108) / 2;
        } else {
            r = 91;
            g = 226;
            b = 108;
        }
    }

    if (areas.includes('S')) { // yellow
        if (r != 0) {
            r = (r + 255) / 2;
            g = (g + 246) / 2;
            b = (b + 107) / 2;
        } else {
            r = 255;
            g = 246;
            b = 107;
        }

    }

    if (areas.includes('Q')) { // purple
        if (r != 0) {
            r = (r + 205) / 2;
            g = (g + 161) / 2;
            b = (b + 255) / 2;
        } else {
            r = 205;
            g = 161;
            b = 255;
        }
    }

    if (areas.includes('E')) { // blue
        if (r != 0) {
            r = (r + 112) / 2;
            g = (g + 212) / 2;
            b = (b + 255) / 2;
        } else {
            r = 112;
            g = 212;
            b = 255;
        }
    }

    let color = "rgb(" + r + "," + g + "," + b + ")";
    return color;
}

function deleteCourse(id) {
    console.log(id);
    document.getElementById(id).style.display = "none";

    // remove from respective array
    // recalculate credits
}

function getCreditsTotal() {
    let sum = 0;
    sum += calculateCredits(fall1) + calculateCredits(spring1) + calculateCredits(fall2) + calculateCredits(spring2) + 
      calculateCredits(fall3) + calculateCredits(spring3) + calculateCredits(fall4) + calculateCredits(fall4);
    return sum;
}
