function DJControls({ volume, onVolumeChange, cpm, onCpmChange, pattern, onPatternChange, bass, onBassChange}) {
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
                        <input type="text" className="form-control" onBlur={onCpmChange} id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cdpm_label"/>
                    </div>
                </li>

                {/* track volume range slider */}
                <li className="list-group-item list-group-item-dark">
                    <label htmlFor="volume_range" className="form-label">Track Volume</label>
                    <input type="range" className="form-range" min="0" max="2" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>
                </li>

                {/* track gain pattern dropdown */}
                {/*<li className="list-group-item list-group-item-dark">
                    <p>Gain Pattern</p>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" onChange={onPatternChange} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="1">Pattern 1</a></li>
                            <li><a className="dropdown-item" href="2">Pattern 2</a></li>
                            <li><a className="dropdown-item" href="3">Pattern 3</a></li>
                        </ul>
                    </div>
                </li> */}

                {/* track gain pattern radio buttons */}
                <li className="list-group-item list-group-item-dark">
                    <p>Gain Pattern</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioPattern" id="0" value="0" checked={pattern === "0"} onChange={onPatternChange}/>
                        <label class="form-check-label" htmlFor="0">
                            Pattern #1
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioPattern" id="1" value="1" checked={pattern === "1"} onChange={onPatternChange}/>
                        <label class="form-check-label" htmlFor="1">
                            Pattern #2
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="radioPattern" id="2" value="2" checked={pattern === "2"} onChange={onPatternChange}/>
                        <label class="form-check-label" htmlFor="2">
                            Pattern #3
                        </label>
                    </div>
                </li> 

                {/* bass line  radio buttons */}
                <li className="list-group-item list-group-item-dark">
                    <p>Bass Line</p>
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