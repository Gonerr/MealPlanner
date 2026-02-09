import { trimStart } from "lodash";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Tests = () => {

    const f1 = (a: number) => {

        switch (a) {
            case 3:
                alert('Маловато');
                break;
            case 4:
                alert('В точку!');
                break;
            case 5:
                alert('Перебор');
                break;
            default:
                alert("Нет таких значений");
        }

        switch (a) {
            case 0:
                alert('Вы ввели число 0')
                break;
            case 1:
                alert('Вы ввели число 1')
                break;
            case 2:
            case 3:
                alert('Вы ввели 2 или 3')
                break;
        }

        // babel - транспилер
        interface Person {
            name: string,
            year: number
        }
        let firstObject: Person = {
            name: "L1n1",
            year: 1998
        };
    }

    
    // до вызова функции
    let menu = {
        width: 200,
        height: 300,
        title: "My menu"
    };


    class Calculator {
        a: number = 0;
        b: number = 0;

        constructor() {
            this.a = 1;
            this.b = 1;
        }

        read(): void {
            const inputA = prompt('a?', '');
            const inputB = prompt('b?', '');

            this.a = inputA ? parseInt(inputA) : 0;
            this.b = inputB ? parseInt(inputB) : 0;
        }

        mul(): number {
            return this.a * this.b;
        }

        sum(): number {
            return this.a + this.b;
        }
    }

    let calculator = new Calculator();
    calculator.read();

    //generational collection (старые объекты живут дольше)
    // incremental collection (все объекты разделены на части)
    // idle-time collection (работа только во время простоя процессора)
    const multiplyNumeric = (obj: any) => {

        for (let key in obj) {
            if (typeof (obj[key]) === 'number') {
                obj[key] *= 2;
            }
        }
    }


    function maskify(cc: string) {
        let lastSymbols = cc.slice(-4, 0);
        console.log(lastSymbols);
    }
    maskify('123456');
    // symbol - другой тип данных, отличный от string

    multiplyNumeric(menu);

    // после вызова функции
    menu = {
        width: 400,
        height: 600,
        title: "My menu"
    };



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