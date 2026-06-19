// components/Main/RecipeCard.tsx
import React, { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { getCategoryIcon } from "./RecipeList";
import { RecipeModal } from "./RecipeModal";
import { Dish } from "../../app/types/menu";
import { useDispatch, useSelector } from "react-redux";
import { PlusIcon, MinusIcon } from "lucide-react";
import { addDish, removeDish } from "@/features/menu/menuSlice";

interface RecipeCardProps {
    dish: Dish;
    onAdd?: (dish: Dish) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ dish, onAdd }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state: any) => state.menu.selected);
    const isSelected = selected.some((s: any) => s.dish.id === dish.id);
    const [showRecipeModal, setShowRecipeModal] = useState(false);

    // Минималистичные цвета для сложности
    const getDifficulty = (time: number) => {
        if (time <= 15)
            return {
                text: "Легкий",
                variant: "light",
                color: "#10b981", // emerald
                bgColor: "#d1fae5", // emerald-100
            };
        if (time <= 30)
            return {
                text: "Средний",
                variant: "light",
                color: "#f59e0b", // amber
                bgColor: "#fef3c7", // amber-100
            };
        return {
            text: "Сложный",
            variant: "light",
            color: "#ef4444", // red
            bgColor: "#fee2e2", // red-100
        };
    };

    const difficulty = getDifficulty(dish.preparationTime);
    const categoryIcon = getCategoryIcon(dish.category);

    const handleToggleDish = (dish: Dish, isSelected: boolean) => {
        if (!isSelected && dish && onAdd) {
            onAdd(dish);
        } else {
            dispatch(removeDish(dish.id));
        }
    };

    return (
        <>
            <Card
                className="h-100 border-0 shadow-sm hover-lift"
                style={{
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    borderRadius: "12px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: isSelected
                        ? "2px solid #22c55e"
                        : "1px solid #e5e7eb",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow =
                        "0 12px 24px rgba(0, 0, 0, 0.08)";
                    e.currentTarget.style.borderColor = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0, 0, 0, 0.05)";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                }}
            >
                {/* Изображение блюда */}
                {/* <div
                    style={{
                        height: "180px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                    onClick={() => setShowRecipeModal(true)}
                >
                    <Card.Img
                        variant="top"
                        src={dish.imageUrl || "/placeholder-recipe.jpg"}
                        alt={dish.name}
                        style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    />

                    <div className="position-absolute top-0 start-0 p-3">
                        <span
                            className="badge px-3 py-2 fw-normal"
                            style={{
                                backgroundColor: difficulty.bgColor,
                                color: difficulty.color,
                                border: `1px solid ${difficulty.color}20`,
                                borderRadius: "6px",
                                fontSize: "0.75rem",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            {difficulty.text}
                        </span>
                    </div>

                    {dish.isChefSpecial && (
                        <div className="position-absolute top-0 end-0 p-3">
                            <span
                                className="badge px-3 py-2 fw-normal"
                                style={{
                                    backgroundColor: "rgba(251, 191, 36, 0.1)", // amber-100 with opacity
                                    color: "#f59e0b", // amber-500
                                    border: "1px solid rgba(245, 158, 11, 0.2)",
                                    borderRadius: "6px",
                                    fontSize: "0.75rem",
                                    backdropFilter: "blur(4px)",
                                }}
                            >
                                <i className="bi bi-star-fill me-1"></i> Особое
                            </span>
                        </div>
                    )}
                </div> */}

                <Card.Body className="d-flex flex-column p-4">
                    <div
                        className="flex-grow-1 cursor-pointer"
                        onClick={() => setShowRecipeModal(true)}
                    >
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="flex-grow-1 me-3">
                                <Card.Title className="h6 mb-2 fw-semibold text-gray-900">
                                    {dish.name}
                                </Card.Title>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <span className="text-gray-400">
                                        {categoryIcon}
                                    </span>
                                    <small className="text-gray-500">
                                        {getCategoryName(dish.category)}
                                    </small>
                                </div>
                            </div>

                            {dish.price > 0 && (
                                <div className="text-end">
                                    <span className="h5 fw-bold text-gray-900">
                                        {dish.price.toFixed(2)} ₽
                                    </span>
                                </div>
                            )}
                        </div>

                        <Card.Text
                            className="text-gray-600 small mb-4"
                            style={{
                                height: "40px",
                                overflow: "hidden",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: "1.5",
                            }}
                        >
                            {dish.description}
                        </Card.Text>

                        {/* Мета информация */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex gap-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i
                                        className="bi bi-clock text-gray-400"
                                        style={{ fontSize: "0.9rem" }}
                                    ></i>
                                    <small className="text-gray-600">
                                        {dish.preparationTime} мин
                                    </small>
                                </div>

                                {dish.calories && (
                                    <div className="d-flex align-items-center gap-2">
                                        <i
                                            className="bi bi-fire text-gray-400"
                                            style={{ fontSize: "0.9rem" }}
                                        ></i>
                                        <small className="text-gray-600">
                                            {dish.calories} ккал
                                        </small>
                                    </div>
                                )}
                            </div>

                            <span
                                className={`px-3 py-1 rounded-pill ${
                                    dish.isAvailable
                                        ? "bg-success-soft"
                                        : "bg-gray-100"
                                }`}
                                style={{
                                    backgroundColor: dish.isAvailable
                                        ? "rgba(16, 185, 129, 0.1)"
                                        : "#f3f4f6",
                                    color: dish.isAvailable
                                        ? "#065f46"
                                        : "#6b7280",
                                    fontSize: "0.75rem",
                                    fontWeight: "500",
                                }}
                            >
                                {dish.isAvailable
                                    ? "✓ Доступно"
                                    : "✗ Нет в наличии"}
                            </span>
                        </div>

                        {/* Теги */}
                        {dish.preparationTime <= 15 ||
                        (dish.calories && dish.calories < 300) ? (
                            <div className="mb-4">
                                <div className="d-flex flex-wrap gap-2">
                                    {dish.preparationTime <= 15 && (
                                        <span
                                            className="badge px-3 py-1"
                                            style={{
                                                backgroundColor:
                                                    "rgba(59, 130, 246, 0.1)",
                                                color: "#1d4ed8",
                                                border: "1px solid rgba(59, 130, 246, 0.2)",
                                                borderRadius: "6px",
                                                fontSize: "0.75rem",
                                                fontWeight: "400",
                                            }}
                                        >
                                            Быстро
                                        </span>
                                    )}
                                    {dish.calories && dish.calories < 300 && (
                                        <span
                                            className="badge px-3 py-1"
                                            style={{
                                                backgroundColor:
                                                    "rgba(168, 85, 247, 0.1)",
                                                color: "#7c3aed",
                                                border: "1px solid rgba(168, 85, 247, 0.2)",
                                                borderRadius: "6px",
                                                fontSize: "0.75rem",
                                                fontWeight: "400",
                                            }}
                                        >
                                            Легкое
                                        </span>
                                    )}
                                    {dish.isChefSpecial && (
                                        <span
                                            className="badge px-3 py-1"
                                            style={{
                                                backgroundColor:
                                                    "rgba(245, 158, 11, 0.1)",
                                                color: "#92400e",
                                                border: "1px solid rgba(245, 158, 11, 0.2)",
                                                borderRadius: "6px",
                                                fontSize: "0.75rem",
                                                fontWeight: "400",
                                            }}
                                        >
                                            Особое
                                        </span>
                                    )}
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="d-flex gap-2">
                        {/* Кнопка действий */}
                        <Button
                            variant="dark"
                            className="w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                            style={{
                                borderRadius: "8px",
                                backgroundColor: "#212529",
                                border: "none",
                                transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "#374151";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                    "#212529";
                            }}
                            onClick={() => setShowRecipeModal(true)}
                        >
                            <i className="bi bi-book"></i>
                            Подробнее
                        </Button>

                        {onAdd && (
                            <Button
                                className="w-100 d-flex align-items-center justify-content-center gap-2"
                                onClick={(e) => {
                                    handleToggleDish(dish, isSelected);
                                    e.stopPropagation();
                                }}
                                style={{
                                    background: isSelected
                                        ? "var(--dark-green-color)"
                                        : "var(--main-color)",
                                    border: "none",
                                    color: "var(--text-color)",
                                    transition: "all 0.2s ease",
                                }}
                            >
                                {isSelected ? (
                                    <MinusIcon size={18} />
                                ) : (
                                    <PlusIcon size={18} />
                                )}
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            {/* Модальное окно рецепта */}
            <RecipeModal
                dish={dish}
                show={showRecipeModal}
                onHide={() => setShowRecipeModal(false)}
            />
        </>
    );
};

const getCategoryName = (category: string) => {
    switch (category) {
        case "salads":
            return "Салат";
        case "soups":
            return "Суп";
        case "main":
            return "Основное";
        case "desserts":
            return "Десерт";
        case "snacks":
            return "Перекус";
        case "drinks":
            return "Напиток";
        case "specials":
            return "Особое";
        default:
            return "Блюдо";
    }
};
