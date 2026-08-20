"use client";

// Главная страница
import DayMenuPlanner from "@/features/menu-plan/ui/DayMenuPlanner";
import DaysSlider from "@/features/menu-plan/ui/DaysSlider";
import PlanBlock from "@/features/menu-plan/ui/PlanBlock";
import { AnimatePresence, motion } from "framer-motion";
import { HeartHandshake, PiggyBank, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  const [selectedDay, setSelectedDay] = useState(0);
  // TODO(history): заменить фиксированные 15 дней на общий date-range selector,
  // чтобы этим же экраном можно было открывать прошлые недели и месяцы.
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
  }, [router]);

  return (
    <div className="app-page planner-page">
      <Container fluid className="app-container">
        <section className="planner-hero">
          <div className="planner-hero__copy">
            <span className="eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              Домашнее меню без хаоса
            </span>
            <h1>
              Что будем есть
              <span className="circle-word"> сегодня?</span>
            </h1>
            <p>
              Собирай меню, учитывай пожелания домашних и сразу понимай,
              сколько времени и денег уйдёт на неделю.
            </p>

            <div className="planner-hero__features">
              <span>
                <HeartHandshake size={17} aria-hidden="true" />
                Пожелания семьи
              </span>
              <span>
                <PiggyBank size={17} aria-hidden="true" />
                Бюджет заранее
              </span>
            </div>
          </div>

          <div className="planner-hero__badge">
            <span>Планируем</span>
            <strong>{days.length}</strong>
            <span>дней вперёд</span>
          </div>
        </section>

        <Row className="g-4 planner-layout">
          <Col xl={9} className="mb-4">
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

          <Col xl={3} className="mb-1">
            <PlanBlock user={user} days={days} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
