import { max } from "lodash";

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

export function longestSlideDown(pyramid: number[][]) {
    let lengthOfPyramid = pyramid.length;
    
    let firstNumber = pyramid[0][0];
    let numOfElement = 0;

    for (let i = 1; i < lengthOfPyramid; i++){
        let maxValue = 0;
        for (let j = 0; j < pyramid[i].length; j++)
        if (pyramid[i][j] >= maxValue && (j - numOfElement <= 1)) {
            maxValue = pyramid[i][j];
            numOfElement = j;
        }
        firstNumber += maxValue;
    }
    return firstNumber;
}

export function longestSlideDown2(pyramid: number[][]) {
    let sums = [...pyramid[pyramid.length - 1]];
    
    for (let i = pyramid.length - 2; i >= 0; i--) {
        for (let j = 0; j < pyramid[i].length; j++) {
            sums[j] = pyramid[i][j] + Math.max(sums[j], sums[j + 1]);
        }
    }
    return sums[0];
}



//Write a function: simplify, that takes a string in input, representing a multilinear non-constant polynomial in integers 
// coefficients (like "3x-zx+2xy-x"), and returns another string as output where the same expression has been simplified in 
// the following way ( -> means application of simplify):
//All possible sums and subtraction of equivalent monomials ("xy==yx") has been done, e.g.:
//"cb+cba" -> "bc+abc", "2xy-yx" -> "xy", "-a+5ab+3a-c-2a" -> "-c+5ab"

//All monomials appears in order of increasing number of variables, e.g.:
//"-abc+3a+2ac" -> "3a+2ac-abc", "xyz-xz" -> "-xz+xyz"

//If two monomials have the same number of variables, they appears in lexicographic order, e.g.:
//"a+ca-ab" -> "a-ab+ac", "xzy+zby" ->"byz+xyz"

//There is no leading + sign if the first coefficient is positive, e.g.:
//"-y+x" -> "x-y", but no restrictions for -: "y-x" ->"-x+y"



export function simplify (formula: string) {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz'

    let polynomials = formula.replace('-','-!').split(/[+-]/);
    polynomials = polynomials.map(p => p.replaceAll('!','-'));

    polynomials
        .sort((a,b) => a.length - b.length)
        .sort((a,b) => {
            // Сначала достаем значения состоящие только из цифр
            const aIsNumeric = /^\d+$/.test(a);
            const bIsNumeric = /^\d+$/.test(b);

            if (aIsNumeric && bIsNumeric){
                return parseInt(a) - parseInt(b); 
            }

            if (aIsNumeric && !bIsNumeric) return 1;
            if (!aIsNumeric && bIsNumeric) return -1;

            return a.localeCompare(b);
        });

    return polynomials;
}
