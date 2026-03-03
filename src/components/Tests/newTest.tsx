
export function justify(text: string, width: number){
    if (text.length <= width) return text;
    
    let formattedText = text.split(' ');
    let result = '';
    let line = '';
    for (let word of formattedText) {
        result += word;
        if (result.length > width){
            line += result + '\n';
        }
        else {
            let words = result.split(' ');
            let freeSpace = width - words.reduce((sum, w) => sum + w.length, 0);
            let space = ' '.repeat(Math.floor(freeSpace/(words.length-1)));
            line = words.join(space) + '\n';
        }
        result += line;
    }
    return result; 
}
