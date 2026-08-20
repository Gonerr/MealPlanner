import { useState } from "react";

export default function MenuPlanner() {
    const [day, setDay] = useState(0);
    const days = ['Сегодня','Завтра', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс', 'Пн', 'Вт'];

    return(
        <div>
            {/* TODO сделать правильное переключение на вкладки Пн и ВТ */}
            <div className="d-flex gap-2 mb-4">
                {days.map((d,i) => (
                    <button
                        key={i}
                        onClick={() => setDay(i)}
                        className={`btn ${day === i ? 'btn-dark' : 'btn-outline-secondary'}`}
                    >
                        {d}
                    </button>
                ))}
            </div>

            <div className="bg-white p-3 rounded-3 shadow-sm">
                <h5>Меню на {days[day]}</h5>

                <div className="mt-3">
                    <h6>Завтрак</h6>
                    <p className="text-muted">(перетащить блюда сюда)</p>

                    <h6>Обед</h6>
                    <p className="text-muted"></p>

                    <h6>Ужин</h6>
                    <p className="text-muted"></p>
                </div>
            </div>
        </div>
    )
}