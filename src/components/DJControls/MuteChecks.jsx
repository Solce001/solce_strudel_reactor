function MuteChecks({muteList, onMuteChange}) {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="B1" id="B1" defaultChecked={muteList.includes("B1")} onChange={onMuteChange}/>
                <label className="form-check-label" htmlFor="B1">Bassline</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="A1" id="A1" defaultChecked={muteList.includes("A1")} onChange={onMuteChange}/>
                <label className="form-check-label" htmlFor="A1">Main Arpeggiator</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="D1" id="D1" defaultChecked={muteList.includes("D1")} onChange={onMuteChange}/>
                <label className="form-check-label" htmlFor="D1">Drum Stack 1</label>
            </div>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" value="D2" id="D2" defaultChecked={muteList.includes("D2")} onChange={onMuteChange}/>
                <label className="form-check-label" htmlFor="D2">Drum Stack 2</label>
            </div>
        </>
    )
}

export default MuteChecks;

