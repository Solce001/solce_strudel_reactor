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
import ProcButtons from './components/ProcButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import { Preprocess } from './utils/PreprocessLogic';
import { Navbar } from './components/Navbar';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }



// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// export function Proc() {

//     let proc_text = document.getElementById('proc').value
//     let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//     ProcessText(proc_text);
//     globalEditor.setCode(proc_text_replaced)
// }

// export function ProcessText(match, ...args) {

//     let replace = ""
//     // if (document.getElementById('flexRadioDefault2').checked) {
//     //     replace = "_"
//     // }

//     return replace
// }

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {

        let outputText = Preprocess({ inputText: procText, volume: volume, cpm: cpm });
        globalEditor.setCode(outputText);
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const [procText, setProcText] = useState(stranger_tune)

    const [volume, setVolume] = useState(1);
    
    const [cpm, setCpm] = useState(120);

    const [state, setState] = useState("stop");

    useEffect(() => {

        if (state === "play") {
            handlePlay();
        }
    }, [volume, cpm])

    /*
    const [songText, setSongText] = useState(stranger_tune) //useState react hook to set the default state of songText to stranger_tune and function to update it 

    const handleProc = () => {
        //TODO
    }

    const handleProcPlay = () => {
        //TODO
    }
        
    */

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
            
        document.getElementById('proc').value = procText
        globalEditor.setCode(procText);
    }
}, [procText]);


return (
    <>
    <div>  
        <main>
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
            <div className="row text-center mt-4 mb-2">
                <h2>Strudel Demo</h2>
            </div>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col text-center mt-2 mb-5">
                      <PlayButtons onPlay={() => { setState("play"); handlePlay() }} onStop={() => { setState("stop"); handleStop() }}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col px-md-3">
                        <DJControls volumeChange={volume} onVolumeChange={(e) => setVolume(e.target.value)} cpmChange={cpm} onCpmChange={(e) => setCpm(e.target.value)} />
                    </div>
                    <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                </div>
                <br/>
                <div className="row text-center">
                    <div className="col mx-md-5" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <PreprocessTextarea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                    </div>

                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
    </>
);


}