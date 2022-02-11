const newYears = '17 Feb 2022';

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();
    let diff = newYearsDate - currentDate;

    // const seconds = (newYearsDate - currentDate)*1000;

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

    console.log(days, hours, minutes, seconds);

    document.getElementById("days").innerText = formatTime(days);
    document.getElementById("hours").innerText = formatTime(hours);
    document.getElementById("minutes").innerText = formatTime(minutes);
    document.getElementById("seconds").innerText = formatTime(seconds);
}

function formatTime(time){
    return time<10 ? (`0${time}`) : time;
}

countdown();

setInterval(countdown, 1000);
