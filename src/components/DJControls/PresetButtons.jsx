function PresetButtons({ onLoadPreset, onSavePreset }) {
    return (
        <div className="btn-group" role="group" aria-label="presetButtonsGroup">
            <button id="load" className="btn btn-outline-light" onClick={onLoadPreset}>Load Preset ↺</button>
            <button id="save" className="btn btn-outline-success"onClick={onSavePreset}>Save Preset 🡇</button>   
        </div>     
    );
}

export default PresetButtons;