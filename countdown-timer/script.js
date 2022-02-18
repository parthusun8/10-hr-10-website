const nameofEvent = document.getElementById('text');
const date = document.getElementById('Date');
const month = document.getElementById('month');
const year = document.getElementById('Year');
// console.log(nameofEvent, date, month, year);
const button = document.getElementById('show');

const container = document.getElementById('countdown-container');
const form = document.getElementById('form');

let eventName = '';
let dateofEvent = 1;
let monthofEvent = '';
let yearofEvent = 2023;

button.addEventListener("click", ()=>{
    eventName = nameofEvent.value;
    dateofEvent = date.value;
    monthofEvent = month.value;
    yearofEvent = year.value;

    form.innerHTML = '';

    
    setInterval(countdown, 1000);
});

function countdown() {
    
    container.innerHTML = `<h1>${eventName} in -></h1>`;
    const DateFinal = `${dateofEvent} ${monthofEvent} ${yearofEvent}`;
    const newYearsDate = new Date(DateFinal);
    const currentDate = new Date();
    let diff = newYearsDate - currentDate;

    let hours = Math.floor( diff/ 3600000);
    let days = 0;
    if (hours >= 24){
        days = Math.floor(hours/24);
        hours = hours%24;
    }
    diff = diff%3600000;

    const minutes = Math.floor(diff/60000);
    diff = diff%60000;
    const seconds = Math.floor(diff/1000);

    
    const parent = document.createElement('div');
    parent.classList.add('parent-div');

    parent.innerHTML = `
        <div class="span-el days-c">
        <p class="big-text" id="days">${formatTime(days)}</p>
        <span>Days</span>
        </div>
        <div class="span-el hours-c">
            <p class="big-text" id="hours">${formatTime(hours)}</p>
            <span>Hours</span>
        </div>
        <div class="span-el min-c">
            <p class="big-text" id="minutes">${formatTime(minutes)}</p>
            <span>Minutes</span>
        </div>
        <div class="span-el sec-c">
            <p class="big-text" id="seconds">${formatTime(seconds)}</p>
            <span>Seconds</span>
        </div>
    `;

    if(days <= 0 && hours <= 0 && minutes <= 0){
        parent.innerHTML = '';
        container.innerHTML = 'Enter A Time/Day Later than Today';
    } else if(!hours){
        parent.innerHTML = '';
        container.innerHTML = 'Enter A Time/Day Later than Today';
    }
    console.log(!hours);
    container.appendChild(parent);
}

function formatTime(time){
    return time<10 ? (`0${time}`) : time;
}

// countdown();

// setInterval(countdown, 1000);
