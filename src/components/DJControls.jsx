import BassRadios from "./DJControls/BassRadios";
import CpmTextInput from "./DJControls/CpmTextInput";
import MuteChecks from "./DJControls/MuteChecks";
import PatternSelect from "./DJControls/PatternSelect";
import VolumeRange from "./DJControls/VolumeRange";

function DJControls({ volume, onVolumeChange, cpm, onCpmChange, pattern, onPatternChange, bass, onBassChange, muteList, onMuteChange}) {
    return (
        <>
            {/* list group structure */}
            <ul className="list-group">
                <li className="list-group-item list-group-item-info text-center">
                    <h5 className="display-6">DJ Control Panel</h5>
                </li>

                {/* track speed text input */}
                <li className="list-group-item list-group-item-dark">
                    <p><strong>Track Speed</strong></p>
                    <CpmTextInput cpmChange={cpm} onCpmChange={onCpmChange}/>
                </li>

                {/* track volume range slider */}
                <li className="list-group-item list-group-item-dark">
                    <VolumeRange volumeChange={volume} onVolumeChange={onVolumeChange}/>
                </li>

                {/* track gain & drum pattern select menu */}
                <li className="list-group-item list-group-item-dark">
                    <p><strong>Gain & Drum Patterns</strong></p>
                    <BassRadios bassChange={bass} onBassChange={onBassChange}/>
                </li>

                {/* bass line radio buttons */}
                <li className="list-group-item list-group-item-dark">
                    <p><strong>Bass Line Options</strong></p>
                    <PatternSelect patternChange={pattern} onPatternChange={onPatternChange}/>
                </li> 

                {/* instrument mute check boxes */}
                <li className="list-group-item list-group-item-dark">
                    <p><strong>Instrument Mute</strong></p>
                    <MuteChecks muteList={muteList} onMuteChange={onMuteChange}/>
                </li>
            </ul>
        </>
    );
}

export default DJControls;