function VolumeRange({onVolumeChange}) {
    return (
        <>
            <label htmlFor="volume_range" className="form-label"><strong>Track Volume</strong></label>
            <input type="range" className="form-range" min="0" max="3" step="0.01" onMouseUp={onVolumeChange} id="volume_range"/>
        </>
    )
}

export default VolumeRange;