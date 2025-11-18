function CpmTextInput({ cpmChange, onCpmChange}) {

    const handleValidation = (e) => {
        let input = Number(e.target.value);
        const minimum = 20;
        const maximum = 300;

        if (input === "" || isNaN(input)) {  
            input = 120;
        }
        else if (input < minimum) {
            input = minimum;
        }      
        else if (input > maximum) {
            input = maximum;
        }

        onCpmChange({ target : {value : input}});
    }
    
    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">CPM</span>
            <input type="text" className="form-control" onBlur={handleValidation} id="cpm_text_input" value={cpmChange} placeholder="120"/>
        </div>
    )
}

export default CpmTextInput;