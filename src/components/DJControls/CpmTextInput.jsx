function CpmTextInput({ cpmChange, onCpmChange}) {
   
    const handleValidation = (e) => {

        // cast text input to a Number, define min and max CPM values
        let input = Number(e.target.value);
        const minimum = 20;
        const maximum = 300;

        // check if input is empty or not a number
        if (input === "" || isNaN(input)) {  
            input = 120;
        }

        else if (input < minimum) {
            input = minimum;
        }
        
        else if (input > maximum) {
            input = maximum;
        }

        // set the CPM to the validated input number
        onCpmChange({ target : {value : input}});
    }
    
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">CPM</span>
                <input type="text" className="form-control" onBlur={handleValidation} id="cpm_text_input" value={cpmChange} placeholder="120"/>
            </div>
        </>
    )
}

export default CpmTextInput;