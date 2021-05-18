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
