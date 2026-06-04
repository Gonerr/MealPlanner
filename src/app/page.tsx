"use client";

// Главная страница
import { Container, Row, Col, Badge } from "react-bootstrap";
import RecipesSection from "../components/RecipesSections";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PlanBlock from "@/components/shared/PlanBlock";
import { AnimatePresence, motion } from "framer-motion";
import DayMenuPlanner from "@/components/Main/DayMenuPlanner";
import DaysSlider from "@/components/Main/DaysSlider";
import "./global.css";

export default function HomePage() {
    const [user, setUser] = useState<any>(null);
    // const isAdminMode = useSelector(selectIsAdminMode);

    const [selectedDay, setSelectedDay] = useState(0);
    const days = Array.from({ length: 15 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);

        return {
            index: i,
            label:
                i === 0
                    ? "Сегодня"
                    : i === 1
                    ? "Завтра"
                    : date.toLocaleDateString("ru-RU", { weekday: "short" }),
            full: date.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
            }),
        };
    });

    const router = useRouter();

    // Проверяем авторизацию
    useEffect(() => {
        fetch("/api/auth/me")
            .then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    router.push("/login");
                }
            })
            .catch(() => router.push("/login"));
    }, []);

    return (
        <div className="App">
            <Container fluid className="px-5 py-4">
                <Row>
                    {/* Основной контент (3/5 = 60% ≈ колонка 7 из 12) */}
                    <Col lg={9} className="mb-4">
                        <DaysSlider
                            days={days}
                            selectedDay={selectedDay}
                            onDayChange={setSelectedDay}
                        ></DaysSlider>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedDay}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <DayMenuPlanner date={days[selectedDay].full} />
                            </motion.div>
                        </AnimatePresence>
                    </Col>

                    <Col lg={3} className="mb-1">
                        <PlanBlock user={user} days={days} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
