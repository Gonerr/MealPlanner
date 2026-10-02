"use client";

import { RootState } from "@/app/store";
import { ShoppingItem } from "@/types/menu";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Home,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSelector } from "react-redux";
import "../css/ShoppingList.css";

type ShoppingTab = "need" | "have";

const categoryLabels: Record<string, string> = {
  vegetable: "Овощи",
  meat: "Мясо",
  dairy: "Молочные продукты",
  spice: "Специи",
  other: "Другое",
};

type PantryItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

const ShoppingList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ShoppingTab>("need");
  const [boughtExpanded, setBoughtExpanded] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const needItems = useMemo(
    () => items.filter((item) => item.status === "need"),
    [items]
  );

  const haveItems = pantryItems;

  const boughtItems = useMemo(
    () => items.filter((item) => item.status === "bought"),
    [items]
  );

  const estimatedPrive = useMemo(
    () =>
      needItems.reduce((total, item) => {
        return total + (item.price || 0);
      }, 0),
    [needItems]
  );

  const householdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );

  const loadShopping = useCallback(async () => {
    if (!householdId) {
      return [];
    }

    const response = await fetch(
      `/api/shopping-list?householdId=${householdId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Не удалось загрузить список покупок");
    }

    return data.items as ShoppingItem[];
  }, [householdId]);

  const loadPantry = useCallback(async () => {
    if (!householdId) {
      return [];
    }

    const response = await fetch(`/api/pantry?householdId=${householdId}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Не удалось загрузить запасы");
    }

    return data.items as PantryItem[];
  }, [householdId]);

  const reload = useCallback(async () => {
    if (!householdId) {
      setItems([]);
      setPantryItems([]);
      return;
    }

    const [shopping, pantry] = await Promise.all([
      loadShopping(),
      loadPantry(),
    ]);

    setItems(shopping);
    setPantryItems(pantry);
  }, [householdId, loadShopping, loadPantry]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const changeStatus = async (id: number, status: "need" | "bought") => {
    if (!householdId) {
      return;
    }

    const response = await fetch("/api/shopping-list", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        householdId,
        id,
        status,
      }),
    });

    if (!response.ok) {
      return;
    }

    await reload();
  };

  const removeItem = async (id: number) => {
    if (!householdId) {
      return;
    }

    const response = await fetch("/api/shopping-list", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        householdId,
        id,
      }),
    });

    if (!response.ok) {
      return;
    }

    await reload();
  };

  const moveToPantry = async (id: number) => {
    if (!householdId) {
      return;
    }

    const response = await fetch("/api/shopping-list/move-to-pantry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        householdId,
        id,
      }),
    });

    if (!response.ok) {
      const data = await response.json();

      console.error(data.error);
      return;
    }

    await reload();
  };

  const handleAddItem = async (event: FormEvent) => {
    event.preventDefault();

    if (!householdId || !newItemName.trim()) {
      return;
    }

    const response = await fetch("/api/shopping-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        householdId,
        name: newItemName.trim(),
        quantity: 1,
        unit: "шт",
        category: "other",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error || "Не удалось добавить продукт");

      return;
    }

    setNewItemName("");

    await reload();
  };

  const shoppingTotal = needItems.length + boughtItems.length;

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
                <span>
                  {item.source === "manual" ? "добавлено вручную" : "из меню"}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="shopping-item__actions">
          {item.status === "need" && (
            <button
              type="button"
              className="shopping-item__action shopping-item__action--home"
              onClick={() => void moveToPantry(item.id)}
              title="Уже есть дома"
            >
              <Home size={16} />
              <span>Есть дома</span>
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

  const renderPantryItem = (item: PantryItem) => (
    <div className="shopping-item shopping-item--have" key={item.id}>
      <div className="shopping-item__main">
        <div className="shopping-item__top">
          <span className="shopping-item__name">{item.name}</span>

          <span className="shopping-item__quantity">
            {item.quantity} {item.unit}
          </span>
        </div>

        <div className="shopping-item__meta">
          <span>{categoryLabels[item.category] || item.category}</span>
        </div>
      </div>
    </div>
  );

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
        {activeTab === "need" ? (
          needItems.length > 0 ? (
            needItems.map(renderItem)
          ) : (
            <div className="shopping-list__empty">...</div>
          )
        ) : pantryItems.length > 0 ? (
          pantryItems.map(renderPantryItem)
        ) : (
          <div className="shopping-list__empty">
            <Home size={24} />
            <strong>Дома пока ничего нет</strong>
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

      {shoppingTotal > 0 && (
        <div className="shopping-list__progress">
          <div className="shopping-list__progress-header">
            <span>
              Куплено {boughtItems.length} из {shoppingTotal}
            </span>

            <span>
              {Math.round((boughtItems.length / shoppingTotal) * 100)}%
            </span>
          </div>

          <div className="shopping-list__progress-track">
            <div
              className="shopping-list__progress-value"
              style={{
                width: `${(boughtItems.length / shoppingTotal) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingList;
