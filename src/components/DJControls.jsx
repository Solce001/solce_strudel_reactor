function DJControls({ volume, onVolumeChange, cpm, onCpmChange}) {
    return (
        <>
            <ul className="list-group">
                <li className="list-group-item list-group-item-info text-center">
                    <h5>DJ Control Panel</h5>
                </li>
                <li className="list-group-item list-group-item-dark">
                    <p>Track Speed</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="cpm_label">CPM</span>
                        <input type="text" className="form-control" onBlur={onCpmChange} id="cpm_text_input"placeholder="120" aria-label="cpm" aria-describedby="cdpm_label"/>
                    </div>
                </li>
                <li className="list-group-item list-group-item-dark">
                    <label htmlFor="volume_range" className="form-label">Track Volume</label>
                    <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>
                </li>
                <li className="list-group-item list-group-item-dark">
                    <p>Instrument Hush</p>
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
                </li>
            </ul>
        </>
    );
}

export default DJControls;