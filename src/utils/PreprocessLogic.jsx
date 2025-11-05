export function Preprocess ({ inputText, volume, cpm}) {

    let outputText = inputText
    
    // replace volume control tag with input value
    outputText = outputText.replaceAll("{$VOLUME}", volume)
    
    // replace volume control tag with input value
    outputText = outputText.replaceAll("{$CPM}", cpm)

    return outputText
}

