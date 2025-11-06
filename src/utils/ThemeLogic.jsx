export function ThemeLogic ({ theme }) {

    // replace each mute instrument control tag with "_" or "" depending on whether they are in the muteList prop or not
    if (theme === "light") {
        theme = "dark"
    }
    else {
        theme = "light"
    }

    return theme
}