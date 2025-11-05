function ProcButtons({ onProc, onProcPlay }) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="processButtonsGroup">
                <button id="process" className="btn btn-outline-primary" onClick={onProc}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary"onClick={onProcPlay}>Proc & Play</button>
            </div> 
        </>
    );
}

export default ProcButtons;