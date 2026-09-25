import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleX, Sparkles } from "lucide-react";
import { useState } from "react";
import Sidebar from "../../../components/layout/Sidebar";

interface PlanBlockProps {
  user?: {
    name?: string;
    email?: string;
  } | null;
  days: Array<{ index: number; label: string; full: string }>;
}
const PlanBlock: React.FC<PlanBlockProps> = ({ user, days = [] }) => {
  const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!welcomeCollapsed ? (
        <motion.div
          className="plan-column"
          key="expanded"
          initial={{ opacity: 0, height: "auto" }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="welcome-card">
            <div className="welcome-card__topline">
              <span>
                <Sparkles size={16} aria-hidden="true" />
                На этой неделе
              </span>
              <button
                type="button"
                onClick={() => setWelcomeCollapsed(true)}
                aria-label="Свернуть приветствие"
              >
                <CircleX size={19} aria-hidden="true" />
              </button>
            </div>

            <h3>Привет, {user?.name || "домашний повар"}!</h3>
            <p>
              Меню становится спокойнее, когда всё видно заранее. Осталось
              заполнить ещё несколько дней.
            </p>

            <div className="welcome-card__progress">
              <div>
                <span>Прогресс недели</span>
                <strong>3 из 7</strong>
              </div>
              <div className="welcome-card__track" aria-hidden="true">
                <span style={{ width: "43%" }} />
              </div>
            </div>
          </div>
          <Sidebar />
        </motion.div>
      ) : (
        <motion.div
          key="collapsed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="welcome-collapsed"
            onClick={() => setWelcomeCollapsed(false)}
          >
            <span>Вернуть подсказку</span>
            <ChevronDown size={19} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlanBlock;
