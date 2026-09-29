"use client";

import { AppDispatch, RootState } from "@/app/store";
import { createHousehold, fetchHouseholds, setSelectedHousehold } from "@/features/households/householdsSlice";
import { Copy, House, Link2, Plus, Users } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type Member = { id: number; name: string; email: string; role: "owner" | "member" };

export default function HouseholdsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, selectedHouseholdId, isLoading } = useSelector((state: RootState) => state.households);
  const selected = items.find((item) => item.id === selectedHouseholdId);
  const [members, setMembers] = useState<Member[]>([]);
  const [familyName, setFamilyName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [issuedCode, setIssuedCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) setJoinCode(code);
  }, []);

  useEffect(() => {
    let active = true;
    setMembers([]);
    setIssuedCode("");
    if (selectedHouseholdId) {
      fetch(`/api/households/members?householdId=${selectedHouseholdId}`)
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          if (active) setMembers(data.members);
        })
        .catch((err) => { if (active) setError(err.message || "Не удалось загрузить участников"); });
    }
    return () => { active = false; };
  }, [selectedHouseholdId]);

  const run = async (work: () => Promise<void>) => {
    setBusy(true); setError(""); setMessage("");
    try { await work(); } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
    } finally { setBusy(false); }
  };

  const create = (event: FormEvent) => {
    event.preventDefault();
    void run(async () => {
      await dispatch(createHousehold(familyName.trim())).unwrap();
      setFamilyName(""); setMessage("Семейное пространство создано");
    });
  };

  const issue = () => void run(async () => {
    const response = await fetch("/api/households/invites", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ householdId: selectedHouseholdId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Не удалось создать код");
    setIssuedCode(data.code);
    setMessage("Код действует 7 дней и сработает один раз. Скопируй его сейчас.");
  });

  const join = (event: FormEvent) => {
    event.preventDefault();
    void run(async () => {
      const response = await fetch("/api/households/invites/join", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: joinCode.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось вступить в семью");
      await dispatch(fetchHouseholds()).unwrap();
      dispatch(setSelectedHousehold(data.householdId));
      setJoinCode(""); setMessage("Ты теперь в семье! Пространство переключено.");
      window.history.replaceState({}, "", "/households");
    });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/households?code=${issuedCode}`);
      setMessage("Ссылка скопирована. Отправь её другу — после входа он сможет вступить.");
    } catch { setError("Скопировать не удалось. Выдели код и скопируй вручную."); }
  };

  return <div className="app-page inventory-page app-container">
    <header className="inventory-hero"><span className="eyebrow"><Users size={16} /> ВМЕСТЕ УДОБНЕЕ</span><h1>Мои пространства</h1><p>Личное меню остаётся твоим, семейное — общее для всех участников.</p></header>
    {(error || message) && <div role={error ? "alert" : "status"} className={`household-notice ${error ? "inventory-error" : ""}`}>{error || message}</div>}
    <div className="inventory-layout">
      <section className="inventory-panel">
        <h2>Выбери пространство</h2>
        {isLoading && <p>Загружаем…</p>}
        <div className="household-list">{items.map((household) =>
          <button key={household.id} className={`household-option ${household.id === selectedHouseholdId ? "is-selected" : ""}`}
            onClick={() => dispatch(setSelectedHousehold(household.id))}>
            <House size={22} /><span><strong>{household.name}</strong><small>{household.type === "personal" ? "Личное" : `Семья · ${household.memberCount} участников`} · {household.role === "owner" ? "владелец" : "участник"}</small></span>
          </button>
        )}</div>
        {selected && <div className="household-members"><h3>Участники «{selected.name}»</h3>
          {members.map((member) => <div key={member.id} className="household-member"><span>{member.name}<small>{member.email}</small></span><em>{member.role === "owner" ? "Владелец" : "Участник"}</em></div>)}
        </div>}
      </section>
      <div className="household-side">
        <form className="inventory-panel inventory-form" onSubmit={create}><h2>Создать семью</h2>
          <label>Название<input required maxLength={60} value={familyName} onChange={(e) => setFamilyName(e.target.value)} placeholder="Например, Дом Насти" /></label>
          <button className="inventory-primary" disabled={busy || !familyName.trim()}><Plus size={17} /> Создать пространство</button>
        </form>
        {selected?.type === "family" && selected.role === "owner" && <section className="inventory-panel inventory-form"><h2>Пригласить друга</h2><p>Создай одноразовую ссылку. Другу понадобится аккаунт в MealPlanner.</p>
          <button className="inventory-primary" disabled={busy} onClick={issue}><Link2 size={17} /> Создать приглашение</button>
          {issuedCode && <div className="household-code"><code>{issuedCode}</code><button onClick={() => void copy()} aria-label="Скопировать ссылку"><Copy size={18} /></button></div>}
        </section>}
        <form className="inventory-panel inventory-form" onSubmit={join}><h2>Вступить по коду</h2>
          <label>Код приглашения<input required value={joinCode} onChange={(e) => setJoinCode(e.target.value)} placeholder="Вставь код от друга" /></label>
          <button className="inventory-primary" disabled={busy || !joinCode.trim()}>Вступить в семью</button>
        </form>
      </div>
    </div>
  </div>;
}
