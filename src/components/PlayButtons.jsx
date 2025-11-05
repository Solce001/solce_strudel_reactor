function PlayButtons({ onPlay, onStop }) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="playButtonsGroup">
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>▶</button>
                <button id="stop" className="btn btn-outline-danger"onClick={onStop}>❚❚</button>   
            </div>     
        </>
    );
}

export default PlayButtons;