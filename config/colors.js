const colors = require("colors");

colors.setTheme({
    cMain: ["brightBlue", "bold"],
    cText: ["white", "bold"],
    cWarning: ["yellow", "bold"],
    cComplete: ["brightGreen"],
    cPending: ["brightRed"],
});

module.exports = colors;