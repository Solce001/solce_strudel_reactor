function BassRadios({bass, onBassChange}) {
    return (
        <>
           <div class="form-check">
                <input class="form-check-input" type="radio" name="bass" id="0" value="0" defaultChecked={bass === "0"} onChange={onBassChange}/>
                <label class="form-check-label" htmlFor="0">
                    Bass #1
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="bass" id="1" value="1" defaultChecked={bass === "1"} onChange={onBassChange}/>
                <label class="form-check-label" htmlFor="1">
                    Bass #2
                </label>
            </div>
        </>
    )
}

export default BassRadios;

