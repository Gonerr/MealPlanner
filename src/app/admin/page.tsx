'use client';
import DishesManager from "@/components/admin/DishesManager";
import IngredientsManager from "@/components/admin/IngredientsManager";
import MenuPlanner from "@/components/admin/MenuPlanner";
import StatsPlanner from "@/components/admin/StatsPlanner";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { fetchRecipes } from "@/features/menu/menuSlice";
import { fetchIngredients } from "@/features/ingredients/ingredientsSlice";

export default function AdminPage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchRecipes());
        dispatch(fetchIngredients());
    }, [dispatch]);


    return (
        <Container className="px-1 py-4">
            <h2 className="mb-4 border-bottom pb-2">
                Панель администратора
            </h2>
        
            <Row className="mb-4">
                <Col md={6}>
                    {/* Компонент для управления блюдами */}
                    <DishesManager/>
                </Col>
                 <Col md={6}>
                 {/* Компонент для управления ингредиентами */}
                    <IngredientsManager/>
                </Col>
            </Row>

            {/* Компонент для управления меню */}
            <div className="mb-4">
                 <MenuPlanner/> 
            </div>

            <StatsPlanner/>
        </Container>
    )
}