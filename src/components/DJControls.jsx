import PlayButtons from "./DJControls/PlayButtons";
import CpmTextInput from "./DJControls/CpmTextInput";
import VolumeRange from "./DJControls/VolumeRange";
import PatternSelect from "./DJControls/PatternSelect";
import BassRadios from "./DJControls/BassRadios";
import MuteChecks from "./DJControls/MuteChecks";
import PresetButtons from "./DJControls/PresetButtons";

function DJControls({ onPlay, onStop, cpm, onCpmChange, volume, onVolumeChange, pattern, onPatternChange, bass, onBassChange, muteList, onMuteChange, onLoadPreset, onSavePreset}) {
    return (
        <ul className="list-group">
            <li className="list-group-item list-group-item-info text-center">
                <h5 className="display-6">DJ Control Panel</h5>
            </li>

            {/* play/pause buttons*/}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <br/>
                <div className="row">
                    <PlayButtons onPlay={onPlay} onStop={onStop}/>
                </div>
                <br/>
            </li>

            {/* track speed text input */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <p><strong>Track Speed</strong></p>
                <CpmTextInput cpmChange={cpm} onCpmChange={onCpmChange}/>
            </li>

            {/* track volume range slider */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <VolumeRange volumeChange={volume} onVolumeChange={onVolumeChange}/>
            </li>

            {/* bass line radio buttons */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <p><strong>Gain & Drum Patterns</strong></p>
                <PatternSelect patternChange={pattern} onPatternChange={onPatternChange}/>
            </li> 

            {/* track gain & drum pattern select menu */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <p><strong>Bass Line Options</strong></p>
                <BassRadios bassChange={bass} onBassChange={onBassChange}/>
            </li>

            {/* instrument mute check boxes */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <p><strong>Instrument Mute</strong></p>
                <MuteChecks muteList={muteList} onMuteChange={onMuteChange}/>
            </li>

            {/* present save/load buttons */}
            <li className="list-group-item list-group-item-action list-group-item-dark">
                <br/>
                    <div className="row">
                        <PresetButtons onLoadPreset={onLoadPreset} onSavePreset={onSavePreset}/>
                    </div>
                <br/>
            </li>
        </ul>
    );
}

export default DJControls;