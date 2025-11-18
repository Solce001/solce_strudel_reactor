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
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './utils/PreprocessLogic';
import preset from './data/preset.json'
import Graph from './components/D3Visualiser';


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    // State hooks
    const [procText, setProcText] = useState(stranger_tune) 
    const [cpm, setCpm] = useState(120);
    const [volume, setVolume] = useState(1);
    const [pattern, setPattern] = useState("0") 
    const [bass, setBass] = useState("0") 
    const [muteList, setMuteList] = useState([]); 
    const [state, setState] = useState("stop");

    // Handler functions
    const handlePlay = () => {
        // Preprocess the song text with current DJ control presets and run REPL
        let outputText = Preprocess({ inputText: procText, cpm: cpm, volume: volume, pattern: pattern, bass: bass, muteList: muteList});
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        // Stop the song from playing
        globalEditor.stop()
    }

    const handleMuteChange = (e) => {
        // Toggle instruments in the mute list depending on if their already muted or not
        const instrument = e.target.value;
        setMuteList(prev => prev.includes(instrument)
            ? prev.filter(i => i !== instrument)
            : [...prev, instrument] 
        )
    };

    const handleLoadPreset = () => {
        // Load saved presets into state
        setCpm(preset.cpm);
        setVolume(preset.volume);
        setPattern(preset.pattern);
        setBass(preset.bass);
        setMuteList(preset.muteList);
    }

    const handleSavePreset = () => {
        // Grab current preset values
        const presets = {
        cpm,
        volume,
        pattern,
        bass,
        muteList
        };

        // Convert presets object into JSON file and create temporary URL
        const data = new Blob([JSON.stringify(presets, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(data);
        
        // Create temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = url;
        link.download = "exportedPresets.json";
        link.click();

        // Free up memory
        URL.revokeObjectURL(url);
    }

    // Effects
    useEffect(() => { 
        // Run song when relevant state changes
        if (state === "play") {
            handlePlay();
        }
    }, [cpm, volume, pattern, bass, muteList])

    useEffect(() => {
        // Initialise Strudel REPL and canvas on first app render
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;

            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //Initialise canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 2;
                canvas.height = canvas.height * 2;
                const drawContext = canvas.getContext('2d');
                const drawTime = [-2, 2]; // time window of drawn haps

                // Initialise Strudel REPL
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
                
            // Set initial song text
            document.getElementById('proc').value = procText
            globalEditor.setCode(procText);
        }
    }, [procText]);

    return (
        <div>  
            <main>
                {/* Header */}
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" >Strudel Demo</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item"><a className="nav-link active" aria-current="page" >Demo</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Title & description */}
                <div className="row text-center mt-4 mb-2">
                    <h2 className="display-3">Strudel Demo</h2>
                    <blockquote className="blockquote">
                        <p>Currently cooking up a track remixed and reproduced from Algorave Dave.</p>
                    </blockquote>
                </div>

                <div className="container-fluid ">
                    <div className="d-flex justify-content-center">
                        {/* DJ Controls */}
                        <div className="col-px-2" style={{maxWidth: '50vh', overflowY: 'auto' }}>
                            <DJControls
                                onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }}
                                cpmChange={cpm} onCpmChange={(e) => setCpm(Number(e.target.value))}
                                volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)}
                                pattern={pattern} onPatternChange={(e) => setPattern(e.target.value)} 
                                bass={bass} onBassChange={(e) => setBass(e.target.value)}
                                muteList={muteList} onMuteChange={(handleMuteChange)}
                                onLoadPreset={handleLoadPreset} onSavePreset={handleSavePreset}
                            />
                        </div>
                        <div className="col-1"></div>
                        {/* Strudel REPL */}
                        <div className="col-6" style={{ maxHeight: '64vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                    <br/>

                    <div className="d-flex justify-content-center">
                        {/*D3 Graph Visualiser*/}
                         <Graph></Graph>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="col-1"></div>
                        {/* Canvas visualiser */}
                        <div className="col-4">
                            <canvas id="roll"></canvas>
                        </div>
                        <div className="col-1"></div>
                        {/* Preprocessed text */}
                        <div className="col-4" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreprocessTextarea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
}