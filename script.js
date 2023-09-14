let floorNum = 10;
let elevator = 7;

let span = '';

for (let i = floorNum; i >= 1; i--) {
    span += `<div><span>${i-1}</span></div>`
}
console.log(span);

for (let i = 0; i < elevator; i++) {
    let elevatorHTML = `
    <div class="elevator" id="elevator${i}">
    <div>
        ${span}
    </div>
    <div class="box" id="box${i}"></div>
    </div>
    `
    let switchHTML = `
    <div>
        <img src="icons/switch-on.png" alt="" class="switch" id="switch${i}">
    </div>
    `
    document.querySelector('.elevatorArea').insertAdjacentHTML('afterbegin', elevatorHTML)
    document.querySelector('.switches').insertAdjacentHTML('afterbegin', switchHTML)
}

for (let i = 0; i < floorNum; i++) {
    let floorHTML = `
    <div class="floor">
    <span>${i}</span>
    <img id="floor${i}" class="floorbtnup" src="icons/arrow-up.png" alt="">
    <img id="floor${i}" class="floorbtndown floorbtnup" src="icons/arrow-up.png" alt="">
    </div>
    `
    document.querySelector('.floors').insertAdjacentHTML('afterbegin', floorHTML)
}


let currfloor = Array(elevator).fill(0);
console.log(currfloor);
let floorbtn = document.querySelectorAll('.floorbtnup')

const handleAnimation = (e) => {
    console.log('handle call');
    let curr = e.target.id.slice(-1)
    let temp = currfloor.map(c =>{
        // console.log('abs val',Math.abs(curr - c));
        // console.log('diff',curr - c);
        return Math.abs(curr - c);
        // curr - c
    });
    // console.log('temp', temp);

    let min = temp.reduce((acc, curr) => {
        return acc < curr ? acc : curr
    })
    console.log('min', min);
    let indexar = [];
    temp.forEach((c, i) => {
        if (c == min) {
            indexar.push(i)
        }
    })
    console.log('i', indexar);
    if (min != 0) {
        let random = indexar[Math.floor(Math.random() * indexar.length)];
        currfloor[random] = Number(e.target.id.slice(-1));
        console.log('random', random);
        document.querySelector(`#box${random}`).style.bottom = `${currfloor[random]}00px`;
    }
    // console.log(currfloor);
}

floorbtn.forEach(f => {
    f.addEventListener('click', handleAnimation)
})



let imgs = document.querySelectorAll('.switch');
imgs.forEach(i => {
    let on = true;
    i.addEventListener('click', e => {
        console.log(e.target.id);
        if (on) {
            document.querySelector(`#${e.target.id}`).src = 'icons/switch-off.png';
            document.querySelector(`#box${e.target.id.slice(-1)}`).style.border = `3px solid red`;
            console.log(currfloor);
            //go to down on off
            document.querySelector(`#box${e.target.id.slice(-1)}`).style.bottom = `0px`;

            delete currfloor[e.target.id.slice(-1)]
            console.log(currfloor);
            on = false;

        } else {
            document.querySelector(`#${e.target.id}`).src = 'icons/switch-on.png';
            document.querySelector(`#box${e.target.id.slice(-1)}`).style.border = `none`;
            // currfloor[e.target.id.slice(-1) ] = 0;
            on = true;

        }
    })
})

