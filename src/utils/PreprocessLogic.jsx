export function Preprocess ({ inputText, volume, cpm, pattern, bass}) {

    let outputText = inputText
    
    // replace volume control tag with input value
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    
    // replace speed control tag with input value
    outputText = outputText.replaceAll("{$CPM}", cpm)

    // replace gain & drum pattern control tag with input value
    outputText = outputText.replaceAll("{$PATTERN}", pattern)

    // replace bass line control tag with input value
    outputText = outputText.replaceAll("{$BASS}", bass)

    return outputText
}

