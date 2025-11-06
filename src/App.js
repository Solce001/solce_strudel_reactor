import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './utils/PreprocessLogic';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: procText, volume: volume, cpm: cpm, pattern: pattern, bass: bass, muteList: muteList}); // passes song text and user input props to Preprocess component
        globalEditor.setCode(outputText); // updates REPL with processed song text
        globalEditor.evaluate() // runs the song
    }

    const handleStop = () => {
        globalEditor.stop() // stops the REPL's currently playing song
    }

    const handleMuteChange = (e) => {
    const instrument = e.target.value;
    setMuteList(prev => prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument] 
    ) };

    // React useState hooks
    const [procText, setProcText] = useState(stranger_tune) // react hook to set the state of processed text

    const [volume, setVolume] = useState(1); // react hook to set the volume state
    
    const [cpm, setCpm] = useState(120); // react hook defining the CPM

    const [pattern, setPattern] = useState("0") // react hook setting the gain & drum pattern

    const [bass, setBass] = useState("0") // react hook setting the bass

    const [muteList, setMuteList] = useState([]); // react hook creating an empty list to store references to instruments to be muted in preprocessing

    const [state, setState] = useState("stop"); // react hook describing whether the song is currently playing or not

    useEffect(() => { // useEffect hook to run at render and when state hook changes
        if (state === "play") {
            handlePlay(); // when state changes to play, run handlePlay function to preprocess and run the song
        }
    }, [volume, cpm, pattern, bass, muteList]) // dependency array specifies useEffect should run when volume or cpm are changed


useEffect(() => {

    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            
        document.getElementById('proc').value = procText // gets the song in the text box and stores the value
        globalEditor.setCode(procText); // runs initial text in procText when app is first rendered
    }
}, [procText]); // dependency array specifies useEffect should run when procText is changed


return (
    <>
    <div>  
        <main>

            {/* header bar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" >Strudel Demo</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <a className="nav-link active" aria-current="page" >Demo</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link disabled" aria-disabled="true">Graph (coming soon)</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* heading */}
            <div className="row text-center mt-4 mb-2">
                <h2 className="display-3">Strudel Demo</h2>
                <blockquote className="blockquote"><p>Currently cooking up a track remixed and reproduced from Algorave Dave.</p></blockquote>
            </div>

            <div className="container-fluid ">
                {/* play/pause button */}
                <div className="row">
                    <div className="col text-center mt-2 mb-5">
                      <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }}/>
                    </div>
                </div>

                <div className="row">
                    {/* DJ Track Controls */}
                    <div className="col px-md-3">
                        <DJControls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)}
                        cpmChange={cpm} onCpmChange={(e) => setCpm(e.target.value)}
                        pattern={pattern} onPatternChange={(e) => setPattern(e.target.value)} 
                        bass={bass} onBassChange={(e) => setBass(e.target.value)}
                        muteList={muteList} onMuteChange={(handleMuteChange)} />
                    </div>

                    {/* Strudel REPL */}
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                </div>
                <br/>

                <div className="row text-center">
                    {/* Preprocessed Text area */}
                    <div className="col mx-md-3" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextarea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                    </div>
                    {/* Canvas visualiser */}
                    <div className="col mx-md-3">
                        <canvas id="roll"></canvas>
                    </div>
                </div>
            </div>
        </main >
    </div >
    </>
);


}