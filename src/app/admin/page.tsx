import { Container, Tab, Tabs } from "react-bootstrap";

export default function AdminPage() {
    return (
        <Container fluid className="py-4">
            <h2 className="mb-4">Панель администратора</h2>
        
            <Tabs defaultActiveKey="dishes" className="mb-3">
                <Tab eventKey="dishes" title="Блюда">
                     {/* TODO: сделать управление блюдами */}
                    {/* <DishesManager/> */}
                </Tab>

                 <Tab eventKey="menu" title="Меню">
                     {/* TODO: сделать управление меню */}
                    {/* <MenuPlanner/> */}
                </Tab>
                
                 <Tab eventKey="ingredients" title="Ингредиенты">
                     {/* TODO: сделать управление ингредиентами */}
                    {/* <IngredientsManager/> */}
                </Tab>

                 <Tab eventKey="stats" title="Статистика">
                     {/* TODO: компонент с основной статистикой по сайту*/}
                    {/* <StatsPlanner/> */}
                </Tab>
            </Tabs>
        </Container>
    )
}