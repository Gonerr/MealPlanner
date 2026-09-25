"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Printer,
  Share2,
  ShoppingBasket,
} from "lucide-react";
import { useState } from "react";

import "../css/ShoppingListCard.css";
import ShoppingList from "./ShoppingList";

const ShoppingListCard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="shopping-card">
      <button
        className="shopping-card__header"
        onClick={() => setCollapsed((prev) => !prev)}
        type="button"
      >
        <div className="shopping-card__heading">
          <div className="shopping-card__icon">
            <ShoppingBasket size={20} strokeWidth={1.8} />
          </div>

          <div>
            <h3>Покупки на неделю</h3>
            <p>20–26 августа</p>
          </div>
        </div>

        <span className="shopping-card__collapse">
          {collapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="shopping-card__content-wrapper"
          >
            <div className="shopping-card__content">
              <ShoppingList />

              <footer className="shopping-card__footer">
                <span>Список сформирован из вашего меню</span>

                <div className="shopping-card__actions">
                  <button type="button" aria-label="Распечатать список">
                    <Printer size={17} />
                  </button>

                  <button type="button" aria-label="Поделиться списком">
                    <Share2 size={17} />
                  </button>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ShoppingListCard;
