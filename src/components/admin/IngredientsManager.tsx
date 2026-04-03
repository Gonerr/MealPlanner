import { AppDispatch } from "@/app/store";
import { deleteIngredient, selectAllIngredients } from "@/features/ingredients/ingredientsSlice"
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"

export default function IngredientsManager() {
    const ingredients = useSelector(selectAllIngredients);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className="bg-white p-3 rounded-3 shadow-sm">
            <div className="d-flex justify-content-between mb-3">
                <h5>Ингредиенты</h5>
                <Button>+ Добавить</Button>
            </div>

            <Table hover>
                <tbody>
                    {ingredients.map((i: any) => (
                        <tr key={i.id}>
                            <td>{i.name}</td>
                            <td>
                                <Button 
                                    size="sm" 
                                    variant="outline-danger" 
                                    onClick={() => dispatch(deleteIngredient(i.id))}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}