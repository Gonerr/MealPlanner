"use client";
import DishesManager from "@/features/admin/ui/DishesManager";
import IngredientsManager from "@/features/admin/ui/IngredientsManager";
import StatsPlanner from "@/features/admin/ui/StatsPlanner";
import { fetchIngredients } from "@/features/ingredients/ingredientsSlice";
import { fetchRecipes } from "@/features/menu/menuSlice";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchRecipes());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <Container className="px-1 py-4">
      <h2 className="mb-4 border-bottom pb-2">Панель администратора</h2>

      <Row className="mb-4">
        <Col md={6}>
          {/* Компонент для управления блюдами */}
          <DishesManager />
        </Col>
        <Col md={6}>
          {/* Компонент для управления ингредиентами */}
          <IngredientsManager />
        </Col>
      </Row>

      {/* Компонент для управления меню */}
      {/* <div className="mb-4">
        <MenuPlanner />
      </div> */}

      <StatsPlanner />
    </Container>
  );
}
