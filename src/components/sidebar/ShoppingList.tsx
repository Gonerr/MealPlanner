import React, { useState } from 'react';
import { Form, ListGroup, Badge } from 'react-bootstrap';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: 1, name: 'Помидоры', quantity: '5 шт', category: 'овощи', checked: false },
    { id: 2, name: 'Куриное филе', quantity: '500 г', category: 'мясо', checked: true },
    { id: 3, name: 'Сыр пармезан', quantity: '200 г', category: 'молочное', checked: false },
    { id: 4, name: 'Базилик', quantity: '1 пучок', category: 'зелень', checked: false },
    { id: 5, name: 'Оливковое масло', quantity: '1 бутылка', category: 'масла', checked: true },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const categories = items.reduce((acc: string[], item) => {
    if (!acc.includes(item.category)) {
        acc.push(item.category);
    }
    return acc;
    }, []);
  const checkedCount = items.filter(item => item.checked).length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Товары: {items.length}</span>
        <Badge bg={checkedCount === items.length ? "success" : "warning"}>
          {checkedCount}/{items.length}
        </Badge>
      </div>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="+ Добавить продукт..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              const target = e.target as HTMLInputElement;
              if (target.value.trim()) {
                setItems([
                  ...items,
                  {
                    id: Date.now(),
                    name: target.value,
                    quantity: '1 шт',
                    category: 'другое',
                    checked: false
                  }
                ]);
                target.value = '';
              }
            }
          }}
        />
      </Form.Group>

      {categories.map(category => {
        const categoryItems = items.filter(item => item.category === category);
        if (categoryItems.length === 0) return null;
        
        return (
          <div key={category} className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="mb-0 text-capitalize">{category}</h6>
              <Badge bg="secondary" pill>{categoryItems.length}</Badge>
            </div>
            
            <ListGroup>
              {categoryItems.map(item => (
                <ListGroup.Item
                  key={item.id}
                  className={`d-flex justify-content-between align-items-center ${item.checked ? 'list-group-item-success' : ''}`}
                >
                  <div className="d-flex align-items-center">
                    <Form.Check
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(item.id)}
                      className="me-2"
                    />
                    <div>
                      <div className={item.checked ? 'text-decoration-line-through' : ''}>
                        {item.name}
                      </div>
                      <small className="text-muted">{item.quantity}</small>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteItem(item.id)}
                  >
                    {(FaTrash as any)}
                  </button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingList;