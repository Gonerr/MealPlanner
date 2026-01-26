import React, { useState, useCallback } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, selectSearchQuery } from '../../features/menu/menuSlice';
import debounce from 'lodash/debounce';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  // Дебаунс для поиска (чтобы не делать запрос на каждый ввод)
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setSearchQuery(query));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    debouncedSearch(value);
  };

  const handleClearSearch = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery));
  };

  return (
    <Form onSubmit={handleSearchSubmit}>
      <InputGroup>
        <InputGroup.Text className="bg-white border-end-0">
            {(FaSearch as any)({className: "text-muted"})}
        </InputGroup.Text>
        
        <Form.Control
          type="text"
          placeholder="Поиск рецептов..."
          value={localQuery}
          onChange={handleSearchChange}
          className="border-start-0"
          aria-label="Поиск рецептов"
        />
        
        {localQuery && (
          <Button
            variant="outline-secondary"
            onClick={handleClearSearch}
            className="border-start-0"
            aria-label="Очистить поиск"
          >
             {(FaTimes as any)}
          </Button>
        )}
        
        <Button
          variant="primary"
          type="submit"
          className="d-none d-md-block"
        >
          Найти
        </Button>
      </InputGroup>
      
      <div className="mt-2">
        <small className="text-muted">
          Ищите по названию, ингредиентам или описанию
        </small>
      </div>
    </Form>
  );
};

export default SearchBar;