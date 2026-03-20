import { simplify } from "./newTest";

// describe('simplify function', () => {
//     it('should split polynomials correctly', () => {
//         const result = simplify("2x+2x-3");
//         expect(result).toEqual(['2x', '2x', '-3']);
//     });
// });

// describe('justify function', () => {
//     test('returns full text if length <= width', () => {
//         const text = '123 45 6';
//         expect(justify(text,7)).toBe('123  45\n6');
//     })

//     // test('returns full text if length <= width', () => {
//     //     const text = '12 45 1234 12';
//     //     expect(justify(text,6)).toBe('12  45\n1234\n12');
//     // })

//     // it("should not add extra spaces to the last line", () => {
//     //     const result = justify("word1 word2 word3", 10);
//     //     const lines = result.split('\n');
//     //     const lastLine = lines[lines.length - 1];
        
//     //     // В Jest используем expect вместо assert
//     //     expect(lastLine).not.toMatch(/\s{2,}/);
        
//     //     const lastLineWords = lastLine.split(' ');
//     //     expect(lastLineWords.every(word => word.length > 0)).toBe(true);
//     // });

//     // test('returns first word for width 10', () => {
//     //     const text = 'Lorem ipsu, dolor sir amet tri omeno dur teakorota';
//     //     expect(justify(text, 10)).toBe('Lorem');
//     // });

//     // test('returns first two words for width 15', () => {
//     //     const text = 'Lorem ipsu, dolor sir amet tri omeno dur teakorota';
//     //     expect(justify(text, 15)).toBe('Lorem     ipsu,');
//     // });
// })


// describe('longestSlideDown function', () => {
//     test('first description example', () => {
//         const pyramids = [ [3],
//                             [7, 4],
//                             [2, 4, 6],
//                             [8, 5, 9, 3]];
//         expect(longestSlideDown2(pyramids)).toBe(23);
//     })
// })
//  // Начинаем с первого числа
//  // полный обход дерева - не вариант, нужен какой-то алгоритм
//  //  