function DJControls({ volume, onVolumeChange, cpm, onCpmChange, pattern, onPatternChange, bass, onBassChange, muteList, onMuteChange}) {
    return (
        <>
            {/* list group structure */}
            <ul className="list-group">
                <li className="list-group-item list-group-item-info text-center">
                    <h5>DJ Control Panel</h5>
                </li>

                {/* track speed text input */}
                <li className="list-group-item list-group-item-dark">
                    <p>Track Speed</p>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="cpm_label">CPM</span>
                        <input type="text" className="form-control" onBlur={onCpmChange} id="cpm_text_input" placeholder="120"/>
                    </div>
                </li>

                {/* track volume range slider */}
                <li className="list-group-item list-group-item-dark">
                    <label htmlFor="volume_range" className="form-label">Track Volume</label>
                    <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>
                </li>

                {/* track gain & drum pattern select menu */}
                <li className="list-group-item list-group-item-dark">
                    <p>Gain & Drum Patterns</p>
                    <select class="form-select" value={pattern} onChange={onPatternChange}>
                       <option value="0" >Pattern #1 (Simple)</option>
                        <option value="1" >Pattern #2 (Varied)</option>
                        <option value="2" >Pattern #3 (Complex)</option>
                    </select>
                </li>

                {/* bass line radio buttons */}
                <li className="list-group-item list-group-item-dark">
                    <p>Bass Line Options</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="bass" id="0" value="0" checked={bass === "0"} onChange={onBassChange}/>
                        <label class="form-check-label" htmlFor="0">
                            Bass #1
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="bass" id="1" value="1" checked={bass === "1"} onChange={onBassChange}/>
                        <label class="form-check-label" htmlFor="1">
                            Bass #2
                        </label>
                    </div>
                </li> 

                {/* instrument hush check boxes */}
                <li className="list-group-item list-group-item-dark">
                    <p>Instrument Mute</p>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="B1" id="B1" checked={muteList.includes("B1")} onChange={onMuteChange}/>
                        <label className="form-check-label" htmlFor="B1">Bassline</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="A1" id="A1" checked={muteList.includes("A1")} onChange={onMuteChange}/>
                        <label className="form-check-label" htmlFor="A1">Main Arpeggiator</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="D1" id="D1" checked={muteList.includes("D1")} onChange={onMuteChange}/>
                        <label className="form-check-label" htmlFor="D1">Drum Stack 1</label>
                    </div>
                     <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="D2" id="D2" checked={muteList.includes("D2")} onChange={onMuteChange}/>
                        <label className="form-check-label" htmlFor="D2">Drum Stack 2</label>
                    </div>

                </li>
            </ul>
        </>
    );
}

export default DJControls;