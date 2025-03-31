$(document).ready(function () {
    const inputField = $("#inputText");
    const themeToggle = $("#themeToggle");

    inputField.on("keyup", function (event) {
        if (event.key === " ") { // Spacebar pressed
            const text = inputField.val();
            const words = text.split(" ");
            const lastWord = words[words.length - 2]; // Get last typed word before space
            
            if (lastWord) {
                $.get("https://inputtools.google.com/request?text=" + lastWord + "&itc=hi-t-i0-und&num=1", function (data) {
                    if (data[0] === "SUCCESS") {
                        words[words.length - 2] = data[1][0][1][0];
                        inputField.val(words.join(" "));
                    }
                });
            }
        }
    });

    // Theme Toggle Function
    function toggleTheme() {
        $("body").toggleClass("dark-mode light-mode");
        const isDarkMode = $("body").hasClass("dark-mode");
        localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
        themeToggle.text(isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode");
    }

    // Load Theme from Local Storage
    if (localStorage.getItem("darkMode") === "enabled") {
        $("body").addClass("dark-mode");
        themeToggle.text("☀️ Light Mode");
    } else {
        $("body").addClass("light-mode");
    }

    // Attach Event Listener to Theme Toggle Button
    themeToggle.on("click", toggleTheme);
});
