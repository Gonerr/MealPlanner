import useDragToScroll from "@/hooks/useDragToScroll";
import { CalendarRange } from "lucide-react";

interface Props {
    days: {
        index: number;
        label: string;
        full: string;
    }[];
    onDayChange: (day: number) => void;
    selectedDay: number;
}

const DaysSlider: React.FC<Props> = ({ days, selectedDay, onDayChange }) => {
  return (
    <section className="days-panel">
      <div className="days-panel__header">
        <div>
          <span className="section-kicker">План дня</span>
          <h2>Меню на {days[selectedDay].label.toLowerCase()}</h2>
          <p>{days[selectedDay].full}</p>
        </div>
        <div className="days-panel__count">
          <CalendarRange size={17} aria-hidden="true" />
          {days.length} дней
        </div>
      </div>

      <div ref={useDragToScroll()} className="days-strip">
        {days.map((day) => (
          <button
            type="button"
            key={day.index}
            onClick={() => onDayChange(day.index)}
            className={`day-pill ${
              selectedDay === day.index ? "is-selected" : ""
            }`}
            aria-pressed={selectedDay === day.index}
          >
            <strong>{day.label}</strong>
            <span>{day.full}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default DaysSlider;
