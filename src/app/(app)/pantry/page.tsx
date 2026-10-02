"use client";

import { RootState } from "@/app/store";
import { PackageOpen, Plus, Trash2 } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

type PantryItem = {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  category: string;
};
const categories: Record<string, string> = {
  vegetable: "Овощи и фрукты",
  meat: "Мясо и рыба",
  dairy: "Молочные продукты",
  grain: "Крупы и бакалея",
  spice: "Специи",
  other: "Другое",
};

export default function PantryPage() {
  const householdId = useSelector(
    (state: RootState) => state.households.selectedHouseholdId
  );
  const household = useSelector((state: RootState) =>
    state.households.items.find((item) => item.id === householdId)
  );
  const [items, setItems] = useState<PantryItem[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("шт");
  const [category, setCategory] = useState("other");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!householdId) return [];
    const response = await fetch(`/api/pantry?householdId=${householdId}`);
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Не удалось загрузить продукты");
    return data.items as PantryItem[];
  }, [householdId]);

  useEffect(() => {
    let active = true;
    setItems([]);
    setError("");
    load()
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [load]);

  const mutate = async (method: "POST" | "PATCH" | "DELETE", body: object) => {
    if (!householdId) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/pantry", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ householdId, ...body }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Не удалось сохранить продукт");
      setItems(await load());
      if (method === "POST") {
        setName("");
        setQuantity("1");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка сохранения");
    } finally {
      setBusy(false);
    }
  };

  const add = (event: FormEvent) => {
    event.preventDefault();
    if (name.trim())
      void mutate("POST", {
        name: name.trim(),
        quantity: Number(quantity),
        unit,
        category,
      });
  };

  return (
    <div className="app-page inventory-page app-container">
      <header className="inventory-hero">
        <span className="eyebrow">
          <PackageOpen size={16} /> ДОМАШНИЕ ЗАПАСЫ
        </span>
        <h1>Что есть дома?</h1>
        <p>
          Продукты пространства «{household?.name || "Личное"}». Участники семьи
          видят общий список.
        </p>
      </header>

      <div className="inventory-layout">
        <section className="inventory-panel">
          <div className="inventory-panel-heading">
            <h2>Запасы</h2>
            <span>{items.length} продуктов</span>
          </div>
          {!householdId && <p>Загружаем пространство…</p>}
          {items.length === 0 && householdId && (
            <div className="inventory-empty">
              Пока пусто. Добавь первый продукт — и он появится здесь.
            </div>
          )}
          {Object.entries(categories).map(([key, label]) => {
            const group = items.filter((item) => item.category === key);
            if (!group.length) return null;
            return (
              <div className="inventory-group" key={key}>
                <h3>{label}</h3>
                {group.map((item) => (
                  <div className="inventory-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.unit}</small>
                    </div>
                    <div className="inventory-actions">
                      <button
                        disabled={busy}
                        title="Уменьшить"
                        onClick={() =>
                          void mutate(
                            item.quantity > 1 ? "PATCH" : "DELETE",
                            item.quantity > 1
                              ? { id: item.id, quantity: item.quantity - 1 }
                              : { id: item.id }
                          )
                        }
                      >
                        −
                      </button>
                      <input
                        key={`${item.id}-${item.quantity}`}
                        aria-label={`Количество: ${item.name}`}
                        type="number"
                        min="0.01"
                        step="any"
                        defaultValue={item.quantity}
                        onBlur={(event) => {
                          const value = Number(event.target.value);
                          if (value > 0 && value !== item.quantity)
                            void mutate("PATCH", {
                              id: item.id,
                              quantity: value,
                            });
                        }}
                      />
                      <button
                        disabled={busy}
                        title="Увеличить"
                        onClick={() =>
                          void mutate("PATCH", {
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        +
                      </button>
                      <button
                        disabled={busy}
                        title="Убрать продукт"
                        onClick={() => void mutate("DELETE", { id: item.id })}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {items
            .filter((item) => !(item.category in categories))
            .map((item) => (
              <div className="inventory-item" key={item.id}>
                <strong>
                  {item.name} — {item.quantity} {item.unit}
                </strong>
                <button
                  disabled={busy}
                  onClick={() => void mutate("DELETE", { id: item.id })}
                >
                  Убрать
                </button>
              </div>
            ))}
        </section>

        <form className="inventory-panel inventory-form" onSubmit={add}>
          <h2>Добавить продукт</h2>
          <label>
            Название
            <input
              required
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, картофель"
            />
          </label>
          <div className="inventory-fields">
            <label>
              Количество
              <input
                required
                type="number"
                min="0.01"
                max="100000"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </label>
            <label>
              Единица
              <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                {["шт", "г", "кг", "мл", "л"].map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Категория
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.entries(categories).map(([key, label]) => (
                <option value={key} key={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button className="inventory-primary" disabled={!householdId || busy}>
            <Plus size={18} /> Добавить в запасы
          </button>
          <p className="inventory-hint">
            Повторное добавление такого же продукта увеличит его количество.
          </p>
          {error && (
            <p role="alert" className="inventory-error">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
