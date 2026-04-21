import { ChevronDown, ChevronUp, PhoneIcon, PrinterIcon, ShoppingCartIcon } from "lucide-react";
import ShoppingList from "./ShoppingList";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "react-bootstrap";

// Компонент списка покупок с кнопками
const ShoppingListCard: React.FC = () => {
    const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

    const handlePrint = () => {
        console.log('Печать списка');
        // Логика печати
    };

    const handleSendToPhone = () => {
        console.log('Отправка на телефон');
        // Логика отправки
    };

    return (
        <AnimatePresence mode="wait">
            {!welcomeCollapsed ? (
            <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 'auto' }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
            >
                <div className="card border-0 bg-white mb-4" style={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
                    overflow: 'hidden'
                }}
                    onClick={() => setWelcomeCollapsed(true)}>
                    <div className="card-body p-0">
                        <div className="p-4 border-bottom" style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '12px'
                                    }}>
                                        <ShoppingCartIcon />
                                    </div>
                                    <h5 className="card-title mb-0" style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#333'
                                    }}>
                                        Список покупок
                                    </h5>
                                </div>

                                <Button
                                    variant='link'
                                    className="text-black p-0"
                                    style={{ textDecoration: 'none', fontSize: '20px' }}
                                >
                                    <ChevronUp size={20} />
                                </Button>
                            </div>
                        </div>

                        <div className="p-4">
                            <ShoppingList />

                            <div className="mt-4 pt-3 border-top">
                                <button
                                    className="btn w-100 mb-2 d-flex align-items-center justify-content-center gap-2"
                                    onClick={handlePrint}
                                    style={{
                                        backgroundColor: '#4caf50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '12px',
                                        fontWeight: '500',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#43a047'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4caf50'}
                                >
                                    <PrinterIcon />
                                    Распечатать список
                                </button>

                                <button
                                    className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                                    onClick={handleSendToPhone}
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: '#4a90e2',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '10px',
                                        padding: '12px',
                                        fontWeight: '500',
                                        fontSize: '0.95rem',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(74, 144, 226, 0.05)';
                                        e.currentTarget.style.borderColor = '#4a90e2';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = '#e0e0e0';
                                    }}
                                >
                                    <PhoneIcon />
                                    Отправить на телефон
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            ) : (
            <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="card border-0 bg-white mb-4" style={{
                    borderRadius: '16px',
                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.02)',
                    overflow: 'hidden'
                }}
                    onClick={() => setWelcomeCollapsed(false)}>
                    <div className="card-body p-0">
                        <div className="p-4 border-bottom" style={{
                            backgroundColor: '#f8f9fa',
                            borderBottom: '1px solid #f0f0f0'
                        }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '10px',
                                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginRight: '12px'
                                    }}>
                                        <ShoppingCartIcon />
                                    </div>
                                    <h5 className="card-title mb-0" style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#333'
                                    }}>
                                        Список покупок
                                    </h5>
                                </div>

                                <Button
                                    variant='link'
                                    className="text-black p-0"
                                    style={{ textDecoration: 'none', fontSize: '20px' }}
                                >
                                    <ChevronDown size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>

    );
};

export default ShoppingListCard;