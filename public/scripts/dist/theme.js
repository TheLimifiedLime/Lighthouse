"use strict";
// Try to get the user's theme preference from localstorage
var theme = localStorage.getItem("theme");
/*
    Check if the user's theme preference is dark mode
    or if their browser indicates that they prefer a dark color scheme and set it to dark mode.
    Otherwise set it to light mode
*/
if (theme === "dark" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.classList.add("dark");
}
else {
    document.documentElement.classList.remove("dark");
}
var toggleTheme = function () {
    // If the site doesn't have the dark mode class add it and save it to localstorage
    if (document.documentElement.classList.contains("dark") === false) {
        document.documentElement.classList.toggle("dark");
        return localStorage.setItem("theme", "dark");
    }
    // If the site has the dark mode class remove it and save it to localstorage
    if (document.documentElement.classList.contains("dark") === true) {
        document.documentElement.classList.toggle("dark");
        return localStorage.setItem("theme", "light");
    }
};
