function TrackCard() {
    return (
        <>
        <div className="card">
            <div className="card-header">
                Now Playing
            </div>
            <div className="card-body">
                <h5 className="card-title">Untitled</h5>
                <p classNames="card-text"></p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Author: Algorave Dave</li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
            </ul>
        </div>
        </>
    )
}

export default TrackCard