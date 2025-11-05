function DJControls({ volume, onVolumeChange, cpm, onCpmChange}) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPm</span>
                <input type="text" className="form-control" onChange={onCpmChange} id="cpm_text_input"placeholder="120" aria-label="cpm" aria-describedby="cdpm_label"/>
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>

            <div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="s1"/>
                    <label className="form-check-label" htmlFor="s1">s1</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d1"/>
                    <label className="form-check-label" htmlFor="d1">d1</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d2"/>
                    <label className="form-check-label" htmlFor="d2">d2</label>
                </div>
            </div>
        </>
    );
}

export default DJControls;