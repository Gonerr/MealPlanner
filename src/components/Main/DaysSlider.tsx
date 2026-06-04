import useDragToScroll from "@/hooks/useDragToScroll";
import { Badge } from "react-bootstrap";

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
        <div className="mb-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h1 className="h2 fw-bold mb-1">
                        меню на {days[selectedDay].label.toLowerCase()}
                    </h1>
                    <p className="text-muted m-0 small">
                        {days[selectedDay].full}
                    </p>
                </div>
                <Badge
                    bg="light"
                    text="dark"
                    className="px-3 py-2 rounded-pill"
                >
                    {days.length} дней
                </Badge>
            </div>

            <div
                ref={useDragToScroll()}
                className="d-flex gap-2 overflow-auto pb-2"
                style={{ cursor: "grab", scrollbarWidth: "thin" }}
            >
                {days.map((day) => (
                    <button
                        key={day.index}
                        onClick={() => onDayChange(day.index)}
                        className={`btn ${
                            selectedDay === day.index
                                ? "btn-dark"
                                : "btn-outline-secondary"
                        }`}
                        style={{
                            borderRadius: "20px",
                            whiteSpace: "nowrap",
                            padding: "0.5em 4em",
                        }}
                    >
                        <div>{day.label}</div>
                        <small className="opacity-75">{day.full}</small>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DaysSlider;
