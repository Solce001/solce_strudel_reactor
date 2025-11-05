export function Preprocess ({ inputText, volume, cpm, pattern}) {

    let outputText = inputText
    
    // replace volume control tag with input value
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    
    // replace speed control tag with input value
    outputText = outputText.replaceAll("{$CPM}", cpm)

    // replace gain pattern control tag with input value
    outputText = outputText.replaceAll("{$PATTERN}", pattern)


    return outputText
}

