import { round, trimStart } from "lodash";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { describe, it, expect } from '@jest/globals';

const Tests = () => {

    // const f1 = (a: number) => {

    //     switch (a) {
    //         case 3:
    //             alert('Маловато');
    //             break;
    //         case 4:
    //             alert('В точку!');
    //             break;
    //         case 5:
    //             alert('Перебор');
    //             break;
    //         default:
    //             alert("Нет таких значений");
    //     }

    //     switch (a) {
    //         case 0:
    //             alert('Вы ввели число 0')
    //             break;
    //         case 1:
    //             alert('Вы ввели число 1')
    //             break;
    //         case 2:
    //         case 3:
    //             alert('Вы ввели 2 или 3')
    //             break;
    //     }

    //     // babel - транспилер
    //     interface Person {
    //         name: string,
    //         year: number
    //     }
    //     let firstObject: Person = {
    //         name: "L1n1",
    //         year: 1998
    //     };
    // }


    // // до вызова функции
    // let menu = {
    //     width: 200,
    //     height: 300,
    //     title: "My menu"
    // };


    // class Calculator {
    //     a: number = 0;
    //     b: number = 0;

    //     constructor() {
    //         this.a = 1;
    //         this.b = 1;
    //     }

    //     read(): void {
    //         const inputA = prompt('a?', '');
    //         const inputB = prompt('b?', '');

    //         this.a = inputA ? parseInt(inputA) : 0;
    //         this.b = inputB ? parseInt(inputB) : 0;
    //     }

    //     mul(): number {
    //         return this.a * this.b;
    //     }

    //     sum(): number {
    //         return this.a + this.b;
    //     }
    // }

    // let calculator = new Calculator();
    // calculator.read();

    //generational collection (старые объекты живут дольше)
    // incremental collection (все объекты разделены на части)
    // idle-time collection (работа только во время простоя процессора)
    // const multiplyNumeric = (obj: any) => {

    //     for (let key in obj) {
    //         if (typeof (obj[key]) === 'number') {
    //             obj[key] *= 2;
    //         }
    //     }
    // }
    // symbol - другой тип данных, отличный от string
    // multiplyNumeric(menu);

    // после вызова функции
    // menu = {
    //     width: 400,
    //     height: 600,
    //     title: "My menu"
    // };


    // function maskify(cc: string) {
    //     if (cc.length < 4) return cc;

    //     const markedPart = '#'.repeat(cc.length - 4);
    //     const lastFour = cc.slice(-4);

    //     cc = markedPart + lastFour;
    //     return cc;
    // }
    //     maskify('123456');

    //


//Передается код состоящий из морзе, задача -> составить слова из этих кодов
// const decodeMorse = function(MorseCode: string) {
//     let phrase = '';

//     for (let split_word of MorseCode.trim().split('   ')) {
//         let word = '';

//         for (let morse of split_word.split(' ')) {
//             let letter = MORSE_CODE[morse];
//             word += letter;
//         }
//         phrase+=word + ' ';
//     }
// }
// decodeMorse('.... . -.--   .--- ..- -.. .') // должно получиться 'HEY JUDE')

// Поиск квадратов чисел
    function checkedSquareNumbers(num: number){
        return (Math.round(num**(1/2)) === num**(1/2)) ? true : false;
    }

    const alphabet = 'abcdefjhigklmnopqrstuvwxyz';
    function isPangram(str: string) {
        let formattedStr = str.toString().toLowerCase().replaceAll(/[^a-z]/g, '');
        console.log(formattedStr)
        let alphabet_str = '';
        for (let letter of formattedStr) {
            if (!alphabet_str.includes(letter)) alphabet_str += letter;
        }

        console.log(alphabet_str)
        return alphabet_str.length === alphabet.length ? 1 : 0;
    }

    // нужно чтобы при abcd -> A-Bb-Ccc-Dddd -> то есть первая буква в верхнем регистре и тд
    function isFormatingWords (str: string) {
        let result = '';
        let count = 0;
        for (let letter of str.toLowerCase()){
            count++;
            result = result + letter.toUpperCase().repeat(1) + letter.repeat(count-1) + '-';
        }
        return result.slice(0,-1);
    }

    // Найти вхождения одного массива в другом
    function checkMassive (numsA: number[], numsB: number[]) {
        return numsA.filter( n => !numsB.includes(n));
    }


    //Write a function that accepts an array of 10 integers (between 0 and 9), that 
    // returns a string of those numbers in the form of a phone number.
    // Example
    // createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) // => returns "(123) 456-7890"
    // The returned format must be correct in order to complete this challenge.
    // Don't forget the space after the closing parentheses!
    // ArraysStringsRegular ExpressionsAlgorithms
    
    // function createPhoneNumber(numbers: number[]){
    //     if (numbers.length < 10) return;

    //     return `(${numbers.slice(3).join('')}) ${numbers.slice(3,6)}-${numbers.slice(6,10)}`;
    // }

    // Write a function that takes an integer as input, and returns the number of bits that are equal 
    // to one in the binary representation of that number. You can guarantee that input is non-negative.
    // Example: The binary representation of 1234 is 10011010010, so the function 
    // should return 5 in this case
    
    // function binaryRepresent(n: number){
    //     if (!n || n===0) return 0;

    //     const binaryString = n.toString(2);
    //     return binaryString.split('1').length;
    // }


// "is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
// "4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
// ""  -->  ""

// function order(str: string){
//   let splitedWords = str.split(' ');
//         let res = new Array (splitedWords.length);
//         for (let i = 1; i < splitedWords.length + 1; i++){
//             for (let word of splitedWords) {
//                 if (word.indexOf(i.toString()) > -1) {
//                     res[i] = word;
//                     break;
//                 } 
//             }
//         }

//         return res.join(' ')
// }


// result = str.match(/любо/gi)   -    g - ищем все совпадения, а не только первое
// i - не учитывает регистр
// result.index - позиция совпадения
// result.input - входная (начальная) строка
 
// \d - цифры 
// function tryRegExp () {
//     let str = "+7(903)-123-45-67";
//     let regexp = /\d/g; // g - ищет все вхождения цирф в данной строке

//     alert (str.match(regexp));

//     regexp = /\s/g;   // space - пробелы, табуляции, переводы строк и т.д. Обычно ставится в конце строки


//     regexp = /\w/g;   // буквы латинские, цирфы или подчеркивание


// }
// function toCamelCase(str){
    
//   return (str.match(/[^-_]/g)).join('');

//   let words = str.split(/[-_]/);
//   let res = words[0];
//   for (let i = 1; i<words.length; i++){
//     res += words[i][0].toString().toCamelCase + words.slice(1);
//   }
//   return res;
  
// }

// function rgb(r,g,b){
//     return [to16Sys(r),to16Sys(g),to16Sys(b)].join('');
// }


// function to16Sys(num: number){
//     if (num <= 0) return '00';
//     if (num >= 255) return 'FF';
//     let alphabet = '0123456789ABCDEF'
//     let res = '';
    
//     while (num !== 0) {
//         res += alphabet[Math.abs(num) % 16];
//         num = Math.floor(num / 16);
//     }
//     if (res.length<2) res = 0 + res;
//     return res.split('').reverse().join('');
// }

//     1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
//    1^4 + 6^4 + 5^4 + 2^4 = 1 + 1296 + 625 + 16 = 1938
// function narcissistic(value: number) {
//     let tryNarcissistic = 0;
//     let lengthNumber = value.toString().length;
//     let initialValue = value;
//     while (value > 0) {
//         tryNarcissistic += Math.pow(Math.floor(value%10),lengthNumber);
//         value = Math.floor(value/10)
//     }

//     return (tryNarcissistic === initialValue) ? true : tryNarcissistic;
// }


//Implement the function unique_in_order which takes as argument a sequence and returns
//  a list of items without any elements with the same value next to each other
//  and preserving the original order of elements.
// For example:

// uniqueInOrder('AAAABBBCCDAABBB') == ['A', 'B', 'C', 'D', 'A', 'B']
// uniqueInOrder('ABBCcAD')         == ['A', 'B', 'C', 'c', 'A', 'D']
// uniqueInOrder([1,2,2,3,3])       == [1,2,3]

// const uniqueInOrder = function(iterable: string) {
//     let result = new Array();
//     for (let letter of iterable) {
//         if (result.at(-1) !== letter) result.push(letter);
//     }
//     return result;
// }


// A child is playing with a ball on the nth floor of a tall building. 
// The height of this floor above ground level, h, is known.
// 
// He drops the ball out of the window. The ball bounces (for example), 
// to two-thirds of its height (a bounce of 0.66).
// His mother looks out of a window 1.5 meters from the ground.
// 
// How many times will the mother see the ball pass in front of her window 
// (including when it's falling and bouncing)?

// Three conditions must be met for a valid experiment:
// Float parameter "h" in meters must be greater than 0
// Float parameter "bounce" must be greater than 0 and less than 1
// Float parameter "window" must be less than h.
// If all three conditions above are fulfilled, return a positive integer, otherwise return -1.

// The ball can only be seen if the height of the rebounding ball 
// is strictly greater than the window parameter.

//Examples:
// - h = 3, bounce = 0.66, window = 1.5, result is 3
// - h = 3, bounce = 1, window = 1.5, result is -1 
// (Condition 2) not fulfilled).


// let regexp = /\d{2}[:-]\d{2}/g; 
// alert( "Завтрак в 09:00. Ужин в 21-30".match(regexp) );

// массивы я знаю
// at - метод для получения элемента массива по индексу
// shift - убирает из массива последний элемент
// массивы не сравниваются между собой

// // принцип работы for... of:
// let range = {
//   from: 1,
//   to: 5,

//   [Symbol.iterator]() {
//     this.current = this.from;
//     return this;
//   },

//   next() {
//     if (this.current <= this.to) {
//       return { done: false, value: this.current++ };
//     } else {
//       return { done: true };
//     }
//   }
// };

// for (let num of range) {
//   alert(num); // 1, затем 2, 3, 4, 5
// }

// Array.from(range, num => num * num);

// map - коллекция ключ/значение, как и object
// map.set("1", "str1");    // строка в качестве ключа
// map.set(1, "num1");      // цифра как ключ
// map.set(true, "bool1");  // булево значение как ключ


// как из the-atealth-warrior получить theStealthWarrior???

// let messages = [
//     {text: "Hello", from: "John"},
//     {text: "How goes?", from: "John"},
//     {text: "See you soon", from: "Alice"}
// ]
// // Чтобы хранить информацию о дате чтения сообщения
// let readMap = new WeakMap();

// readMap.set(messages[0], new Date(2017,1,1));

// Найти все HTML-комментарии в тексте:
let regexp = /[\w\s]+/g;
let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;


alert( str.match(regexp) );

// опережающая проверка: X(?=Y) - указывает, что где-то после выражения X обязательно
// находится символ Y
// негативная опережающая проверка: (?!Y) - точно нет символа Y

    return (
        <>
            <div>
                Я JavaScript


            </div>
            <Link to="Tests/TestsJS">
                Ссылка на Js
            </Link>
        </>
    );
}

export default Tests; 