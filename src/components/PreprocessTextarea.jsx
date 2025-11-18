function PreprocessTextarea({ defaultValue, onChange }) {
    return (
        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <label htmlFor="proc" className="form-label"><h4>Preprocessed Song Text:</h4></label>
            <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessTextarea;
                    