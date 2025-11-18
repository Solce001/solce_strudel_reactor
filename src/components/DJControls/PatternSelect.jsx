function PatternSelect ({pattern, onPatternChange}) {
    return (
         <select class="form-select" value={pattern} onChange={onPatternChange}>
            <option value="0" >Pattern #1 (Simple)</option>
            <option value="1" >Pattern #2 (Varied)</option>
            <option value="2" >Pattern #3 (Complex)</option>
        </select>
    )
}

export default PatternSelect;