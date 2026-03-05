import { Container } from "react-bootstrap"

const Github = () => {


    return (
        <Container>
            <h2> Пояснения к основным командам Github</h2>

            <div>
                <h4> Crerry-pick </h4>
                <div>
                    Берёт и достает из коммитов самый нужный нам (по названию) 
                    и вставляет туда, куда надо нам
                    <ul>
                        <li>
                            Git log - Показывает историю изменений в git;
                            Он имеет различные параметры. Например
                            <ol>
                                --oneline - позволяет выводить команды в одну строку
                            </ol>
                            <ol>
                                shortlog - позволяет вывести объявления о релизах (кто какой)
                                коммит выложил, например 
                            </ol>
                        </li>
                        <li>
                            reset - стирает текущие изменения в ветке (в т. ч. коммит)
                        </li>
                    </ul>
                </div>
            </div>
        </Container>
    )

}

export default Github