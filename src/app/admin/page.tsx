'use client';
import DishesManager from "@/components/admin/DishesManager";
import IngredientsManager from "@/components/admin/IngredientsManager";
import MenuPlanner from "@/components/admin/MenuPlanner";
import StatsPlanner from "@/components/admin/StatsPlanner";
import { Container, Tab, Tabs } from "react-bootstrap";

export default function AdminPage() {
    return (
        <Container fluid className="py-4">
            <h2 className="mb-4">Панель администратора</h2>
        
            <Tabs defaultActiveKey="dishes" className="mb-3">
                <Tab eventKey="dishes" title="Блюда">
                     {/* Компонент для управления блюдами */}
                    <DishesManager/> 
                </Tab>

                 <Tab eventKey="menu" title="Меню">
                     {/* Конмонент для управления меню */}
                    <MenuPlanner/> 
                </Tab>
                
                 <Tab eventKey="ingredients" title="Ингредиенты">
                     {/* Компонент для управления ингредиентами */}
                    <IngredientsManager/>
                </Tab>

                 <Tab eventKey="stats" title="Статистика">
                     {/* Компонент с основной статистикой по сайту*/}
                    <StatsPlanner/>
                </Tab>
            </Tabs>
        </Container>
    )
}