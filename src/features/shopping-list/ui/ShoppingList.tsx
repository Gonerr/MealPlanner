"use client";

import { ShoppingItem } from "@/types/menu";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Home,
  Plus,
  RotateCcw,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import React, { FormEvent, useMemo, useState } from "react";
import "../css/ShoppingList.css";

type ShoppingTab = "need" | "have";

// Пока что подставляем захардкоженные данные
const initialItems: ShoppingItem[] = [
  {
    id: 1,
    ingredientId: 1,
    name: "Помидоры",
    quantity: 5,
    category: "vegetable",
    price: 190,
    unit: "шт",
    status: "need",
    source: "menu",
  },
  {
    id: 2,
    ingredientId: 2,
    name: "Куриное филе",
    quantity: 5,
    category: "vegetable",
    price: 190,
    unit: "шт",
    status: "need",
    source: "menu",
  },
  {
    id: 3,
    ingredientId: 3,
    name: "Сыр",
    quantity: 200,
    price: 240,
    unit: "г",
    category: "dairy",
    status: "have",
    source: "menu",
  },
  {
    id: 4,
    name: "Хлеб",
    quantity: 1,
    price: 90,
    unit: "шт",
    category: "other",
    status: "bought",
    source: "manual",
  },
];

const categoryLabels: Record<string, string> = {
  vegetable: "Овощи",
  meat: "Мясо",
  dairy: "Молочные продукты",
  spice: "Специи",
  other: "Другое",
};

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);

  const [activeTab, setActiveTab] = useState<ShoppingTab>("need");
  const [boughtExpanded, setBoughtExpanded] = useState(false);

  const [newItemName, setNewItemName] = useState("");

  const needItems = useMemo(
    () => items.filter((item) => item.status === "need"),
    [items]
  );

  const haveItems = useMemo(
    () => items.filter((item) => item.status === "have"),
    [items]
  );

  const boughtItems = useMemo(
    () => items.filter((item) => item.status === "bought"),
    [items]
  );

  const visibleItems = activeTab === "need" ? needItems : haveItems;

  const estimatedPrive = useMemo(
    () =>
      needItems.reduce((total, item) => {
        return total + (item.price || 0);
      }, 0),
    [needItems]
  );

  const changeStatus = (id: number, status: ShoppingItem["status"]) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = (event: FormEvent) => {};

  const renderItem = (item: ShoppingItem) => {
    return (
      <div
        className={`shopping-item shopping-item--${item.status}`}
        key={item.id}
      >
        <button
          type="button"
          className="shopping-item_check"
          onClick={() =>
            item.status === "bought"
              ? changeStatus(item.id, "need")
              : changeStatus(item.id, "bought")
          }
          aria-label={
            item.status === "bought"
              ? "Вернуть в список покупок"
              : "Отметить как купленное"
          }
        >
          {item.status === "bought" && <Check size={16} />}
        </button>

        <div className="shopping-item__main">
          <div className="shopping-item__top">
            <span className="shopping-item__name">{item.name}</span>

            <span className="shopping-item__quantity">
              {item.quantity} {item.unit}
            </span>
          </div>

          <div className="shopping-item__meta">
            <span>{categoryLabels[item.category] || item.category}</span>

            {item.price > 0 && (
              <>
                <span className="shopping-item__dot">•</span>
                <span>добавлено вручную</span>
              </>
            )}
          </div>
        </div>

        <div className="shopping-item__actions">
          {item.status === "need" && (
            <button
              type="button"
              className="shopping-item__action shopping-item__action--home"
              onClick={() => changeStatus(item.id, "have")}
              title="Уже есть дома"
            >
              <Home size={16} />
              <span>Есть дома</span>
            </button>
          )}

          {item.status === "have" && (
            <button
              type="button"
              className="shopping-item__action"
              onClick={() => changeStatus(item.id, "need")}
              title="Вернуть в покупки"
            >
              <ShoppingBag size={16} />
              <span>Купить</span>
            </button>
          )}

          {item.status === "bought" && (
            <button
              type="button"
              className="shopping-item__icon-action"
              onClick={() => changeStatus(item.id, "need")}
              title="Вернуть в покупки"
            >
              <RotateCcw size={16} />
            </button>
          )}

          <button
            type="button"
            className="shopping-item__icon-action shopping-item__icon-action--delete"
            onClick={() => removeItem(item.id)}
            title="Удалить"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="shopping-list">
      <div className="shopping-list__summary">
        <div>
          <span className="shopping-list__summary-label">Осталось купить</span>

          <strong className="shopping-list__summary-value">
            {needItems.length}
          </strong>
        </div>

        <div>
          <span className="shopping-list_summary-label">Примерная сумма</span>
          <strong className="shopping-list_summary-value">
            {estimatedPrive.toLocaleString("ru-RU")} ₽
          </strong>
        </div>
      </div>

      <form className="shopping-list__add" onSubmit={handleAddItem}>
        <Plus size={18} />

        <input
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Добавить что-нибудь ещё..."
        />

        {newItemName.trim() && <button type="submit">Добавить</button>}
      </form>

      <div className="shopping-list__tabs">
        <button
          type="button"
          className={
            activeTab === "need"
              ? "shopping-list__tab shopping-list__tab--active"
              : "shopping-list__tab"
          }
          onClick={() => setActiveTab("need")}
        >
          Купить
          <span>{needItems.length}</span>
        </button>

        <button
          type="button"
          className={
            activeTab === "have"
              ? "shopping-list__tab shopping-list__tab--active"
              : "shopping-list__tab"
          }
          onClick={() => setActiveTab("have")}
        >
          Есть дома
          <span>{haveItems.length}</span>
        </button>
      </div>

      <div className="shopping-list__items">
        {visibleItems.length > 0 ? (
          visibleItems.map(renderItem)
        ) : (
          <div className="shopping-list__empty">
            {activeTab === "need" ? (
              <>
                <Check size={24} />

                <strong>Всё необходимое уже отмечено</strong>

                <span>Здесь появятся продукты, которые нужно купить.</span>
              </>
            ) : (
              <>
                <Home size={24} />

                <strong>Пока ничего не отмечено</strong>

                <span>
                  Нажми "Есть дома" у продукта, чтобы убрать его из покупок.
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {boughtItems.length > 0 && (
        <div className="shopping-list__bought">
          <button
            type="button"
            className="shopping-list__bought-header"
            onClick={() => setBoughtExpanded((prev) => !prev)}
          >
            <div>
              <Check size={17} />

              <span> Куплено </span>
              <span className="shopping-list__bought-count">
                {boughtItems.length}
              </span>
            </div>

            {boughtExpanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>

          {boughtExpanded && (
            <div className="shopping-list__bought-items">
              {boughtItems.map(renderItem)}
            </div>
          )}
        </div>
      )}

      {items.length > 0 && (
        <div className="shopping-list__progress">
          <div className="shopping-list__progress-header">
            <span>
              Куплено {boughtItems.length} из{" "}
              {needItems.length + haveItems.length + boughtItems.length}
            </span>

            <span>
              {Math.round((boughtItems.length / items.length) * 100)}%
            </span>
          </div>

          <div className="shopping-list__progress-track">
            <div
              className="shopping-list__progress-value"
              style={{
                width: `${(boughtItems.length / items.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
