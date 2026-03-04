
export function justify(text: string, width: number){
    if (text.length <= width) return text;
    let resultText = '';
    let currentLine = '';
    for (let word of text.split(' ')){
        if (currentLine.length === 0) {
            currentLine = word; 
            continue;
        };

        if ((currentLine+word).length < width) {
            currentLine += ' ' + word;
        } else {
            resultText += splitLine(currentLine, width) + '\n';
            currentLine = word;
        }
    }
    resultText += currentLine;

    return resultText;
}

function splitLine (text: string, width: number) {
    let words = text.split(' ');
    let lengthWords = words.reduce((sum, w) => sum + w.length, 0);
    let freeSpace = width - lengthWords;

    // нужно равномерно распределить пробелы справа - налево
    let spaces = words.length - 1;
    let res = words[0];
    
    for (let i = 1; i < words.length; i++){
        let spaceCount = Math.max(Math.ceil(freeSpace/spaces), 1);
        res += ' '.repeat(spaceCount) + words[i];
        freeSpace-= spaceCount;
        spaces--;
    }
    return res;
}