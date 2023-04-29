"use strict";
onload = (event) => {
    console.log('page loaded');
    setHands();
    console.log("seconds to next whole minute: " + millisecondsToNextMinute() / 1000);
    setTimeout(setHands, millisecondsToNextMinute());
    setTimeout(updateClockRegularly, millisecondsToNextMinute());
};
function setHands() {
    /* to set current time */
    // console.log("in setHands");
    const time = new Date();
    const hour = -3600 * (time.getHours() % 12);
    const mins = -60 * time.getMinutes();
    const secs = -1 * time.getSeconds();
    // Get the root element
    let r = document.querySelector(":root");
    reset_animation();
    if (r != null && r instanceof HTMLElement) {
        r.style.setProperty("--_dm", `${mins}s`);
        r.style.setProperty("--_dh", `${hour + mins}s`);
        r.style.setProperty("--_ds", `${secs}s`);
    }
}
function millisecondsToNextMinute() {
    // calculate next whole minute
    const now = new Date();
    const lastMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
    const nextMinute = lastMinute.valueOf() + 60 * 1000;
    return (nextMinute - now.valueOf());
}
function updateClockRegularly() {
    // console.log("in updateClockRegularly");
    setInterval(setHands, 60 * 1000);
}
function reset_animation() {
    let elements = document.getElementsByClassName("arm");
    for (let element of elements) {
        if (element instanceof HTMLElement) {
            element.style.animation = "none";
            element.offsetHeight; /* trigger reflow */
            element.style.animation = "";
        }
    }
}
