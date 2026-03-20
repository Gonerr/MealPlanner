import { Container } from "react-bootstrap";

const Objects = () => {

    return (
        <Container fluid>
            <h3> Object.keys, values, entries</h3>
            <ul>
                <li>Object.keys(obj) - возвращает массив ключей</li>
                <li> Object.values(obj) - возвращает массив значений</li>
                <li> Object.entries(obj) - возвращает массив пар [ключ, значение]</li>
            </ul>
            <div style={{
                padding: '2rem'
            }}>
                <strong>Деструктуризация массива</strong> - спец. синтаксис, который позволяет нам "распаковать" массивы
                или объекты в несколько переменных, так как иногда они более удобны.
            </div>

            <div style={{
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>

            </div>

            <code style={{width: '70%'}}>
                let arr = ["Ilya", "Kantor"]; <br />
                let [firstName, surName] = arr; // firstName = arr[0]; surName = arr[1];
            </code>

            <div style={{
                padding: '2rem'
            }}>
                <strong>Оператор расширения</strong> - оператор "...", который позволяется раскрыть массив в список аргументов.
                <ul>
                    Если ...
                    <li>располагается в конце списка параметров функции, то это "остаточные параметры". <br/>
                        Он собирает остальные неуказанные аргументы и делает из них массив.</li>
                    <li>встретился в вызове функции, то это "оператор расширения". <br/> 
                        Он извлекает элементы из массива.</li>
                </ul>
            </div>
            
           
            <div style={{
                width: '70%',
                background: '#dddddd',
                padding: '1rem 1.5rem',
                alignSelf: 'center',
                justifySelf: 'center'
            }}>
                <strong style={{fontSize:'large',}}>Замыкание</strong> <br/>
                - функция, которая запоминает свои внешние переменные и может получить к ним доступ. <br/>
                - это комбинация функции и лексического окружения, в котором эта функция была определена. <br/>
                - это функция, которая "запоминает" переменные из того места, где была создана,
                даже после того, как это место уже закончило работу.
                <ul>
                    <li>
                        Они автоматически запоминают, где были созданы (с помощью скрытого
                    свойства <code>[[Enviroment]]</code>), и все они могут получить 
                    доступ к внешним переменным.
                    </li>
                    <li>
                        Все функции в JavaScript являются замыканиями. 
                    </li>
                    <li>
                        Создаются каждый раз при создании функции, во время её создания.
                    </li>
                </ul>

                <code style={{padding:'1rem 0'}}>
                   { `Напишите функцию sum, которая работает таким образом: sum(a)(b) = a + b;
                    function sum(a){
                        return function (b) {
                            return a + b;
                        }
                    }
                    Чтобы вторые скобки заработали, первые - должны вернуть функцию.` 
                    }
                </code>

                    <ul>
                        <li>
                            <code>
                                {
                                    `let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
                                    Позволяет получить полную информацию о свойстве
                                    
                                    let user = {
                                        name: "John"
                                    };

                                    let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

                                    alert( JSON.stringify(descriptor, null, 2 ) );
                                    /* дескриптор свойства:
                                    {
                                        "value": "John",
                                        "writable": true,
                                        "enumerable": true,
                                        "configurable": true
                                    }
                                    */
                                    `
                                }
                            </code>
                        </li>
                    </ul>

            </div>
        </Container>
    );
}

export default Objects;