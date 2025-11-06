function CpmTextInput({onCpmChange}) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">CPM</span>
                <input type="text" className="form-control" onBlur={onCpmChange} id="cpm_text_input" placeholder="120"/>
            </div>
        </>
    )
}

export default CpmTextInput;