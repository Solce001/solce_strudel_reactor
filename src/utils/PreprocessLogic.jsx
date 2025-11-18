export function Preprocess ({ inputText, volume, cpm, pattern, bass, muteList}) {

    let outputText = inputText
    
    // replace speed control tag with input value
    outputText = outputText.replaceAll("{$CPM}", cpm)

    // replace volume control tag with input value
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    
    // replace gain & drum pattern control tag with input value
    outputText = outputText.replaceAll("{$PATTERN}", pattern)

    // replace bass line control tag with input value
    outputText = outputText.replaceAll("{$BASS}", bass)

    // replace each mute instrument control tag with "_" or "" depending on whether they are in the muteList prop or not
    if (muteList.includes("B1")) {outputText = outputText.replace("{$B1}", "_");}
    else {outputText = outputText.replace("{$B1}", "");}

    if (muteList.includes("A1")) {outputText = outputText.replace("{$A1}", "_");}
    else {outputText = outputText.replace("{$A1}", ""); }

    if (muteList.includes("D1")) {outputText = outputText.replace("{$D1}", "_");}
    else {outputText = outputText.replace("{$D1}", "");}

    if (muteList.includes("D2")) {outputText = outputText.replace("{$D2}", "_");}
    else {outputText = outputText.replace("{$D2}", "");}

    return outputText
}