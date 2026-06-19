import { useState } from "react";

const MenuBar = () => {

    const [selectedDay, setSelectedDay] = useState(0);
    const days = Array.from({length: 7}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);

        return {
        index: i,
        label: i === 0 ? 'Сегодня' : date.toLocaleDateString('ru-RU', {weekday: 'short'}),
        full: date.toLocaleDateString('ru-RU',{day: 'numeric', month: 'long'})
        };
    });

    return (
        <div>
            <div className="px-4 py-4">
                <h1 className="h2 fw-bold mb-1">
                    меню на {days[selectedDay].label.toLowerCase()}
                </h1>
                <p className="text-muted m-0">
                    Подборка блюд на день
                </p>
            </div>

            <div className="py-4 border-bottom">
                <div className="d-flex gap-2 overflow-auto px-3">

                    {days.map(day => (
                        <button
                            key={day.index}
                            onClick={() => setSelectedDay(day.index)}
                            className={`btn ${
                                selectedDay === day.index
                                ? 'btn-dark'
                                : 'btn-outline-secondary'
                                }`}
                                style={{
                                    borderRadius: '20px',
                                    whiteSpace: 'nowrap'
                                }}
                        >
                            <div>{day.label}</div>
                            <small className="opacity-75">{day.full}</small>
                        </button>
                    ))}

                </div>
            </div>
        </div>
        
    )

}

export default MenuBar;