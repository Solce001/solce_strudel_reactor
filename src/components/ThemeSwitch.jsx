function ThemeSwitch({ theme, onThemeChange }) {
    return (
        <>
            {/* page colour theme switch */}
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="themeSwitch" checked={theme === "dark"} onChange={onThemeChange}/>
                <label className="form-check-label" htmlFor="themeSwitch">Default switch checkbox input</label>
            </div>
        </>
    );
}
export default ThemeSwitch;