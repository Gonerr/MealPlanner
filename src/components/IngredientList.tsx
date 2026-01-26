import React from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, ListGroup } from 'react-bootstrap';
import { selectAllIngredients } from '../features/ingredients/ingredientsSlice';
import { Ingredient } from '../types/menu';

interface IngredientListProps {
  ingredientIds: number[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredientIds }) => {
  const allIngredients = useSelector(selectAllIngredients);
  
  const ingredients = allIngredients.filter(ing => 
    ingredientIds.includes(ing.id)
  );

  const getCategoryColor = (category: Ingredient['category']): string => {
    switch (category) {
      case 'vegetable': return 'success';
      case 'meat': return 'danger';
      case 'dairy': return 'info';
      case 'spice': return 'warning';
      default: return 'secondary';
    }
  };

  if (ingredients.length === 0) {
    return <p className="text-muted">Ингредиенты не указаны</p>;
  }

  return (
    <Card>
      <Card.Header className="bg-light">
        <strong>Ингредиенты:</strong>
      </Card.Header>
      <ListGroup variant="flush">
        {ingredients.map(ingredient => (
          <ListGroup.Item key={ingredient.id} className="d-flex justify-content-between align-items-center">
            <div>
              <span className="fw-medium">{ingredient.name}</span>
              {ingredient.isAvailable && (
                <Badge bg="danger" className="ms-2">Недоступно</Badge>
              )}
              <div className="text-muted small">{ingredient.description}</div>
            </div>
            <Badge bg={getCategoryColor(ingredient.category)}>
              {ingredient.category === 'vegetable' && '🥦'}
              {ingredient.category === 'meat' && '🥩'}
              {ingredient.category === 'dairy' && '🧀'}
              {ingredient.category === 'spice' && '🌿'}
              {ingredient.category === 'other' && '📦'}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default IngredientList;