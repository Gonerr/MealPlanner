"use client";
import DishesManager from "@/features/admin/ui/DishesManager";
import IngredientsManager from "@/features/admin/ui/IngredientsManager";
import StatsPlanner from "@/features/admin/ui/StatsPlanner";
import { fetchIngredients } from "@/features/ingredients/ingredientsSlice";
import { fetchRecipes } from "@/features/menu/menuSlice";
import { Database, SlidersHorizontal, WandSparkles } from "lucide-react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Container fluid className="app-container admin-page">
      <section className="admin-hero">
        <div>
          <span className="eyebrow">
            <SlidersHorizontal size={15} aria-hidden="true" />
            Управление приложением
          </span>
          <h1>Кухонная мастерская</h1>
          <p>
            Здесь хранится база блюд и ингредиентов, из которой собирается
            меню для всех домашних.
          </p>
        </div>

        <div className="admin-hero__chips">
          <span>
            <Database size={16} aria-hidden="true" />
            Единая база
          </span>
          <span>
            <WandSparkles size={16} aria-hidden="true" />
            Настройка меню
          </span>
        </div>
      </section>

      <div className="admin-stack">
        <DishesManager />

        <div className="admin-lower-grid">
          <IngredientsManager />
          <StatsPlanner />
        </div>
      </div>

      {/* TODO(admin): вынести архив блюд в отдельную вкладку и добавить
          восстановление, чтобы администратор не работал с архивом вслепую. */}
    </Container>
  );
}
