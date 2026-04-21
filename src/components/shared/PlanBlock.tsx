
import { AnimatePresence, motion } from 'framer-motion';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import WeeklyPlan from '../WeeklyPlan';

interface PlanBlockProps {
    user?:{
        name?: string,
        email?: string,
    } | null, 
    days: Array<{ index: number; label: string; full: string; }>;
}
const PlanBlock: React.FC<PlanBlockProps> = ({user, days = []}) => {
    const [welcomeCollapsed, setWelcomeCollapsed] = useState(false);

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
                    <div className='card border-0 bg-gradient-primary mb-3' style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '20px',
                        color: 'white',
                        overflow: 'hidden'
                    }}>
                        <div className='card-body p-4'>
                            <div className='d-flex justify-content-between align-items-start mb-3'>
                                <div>
                                    <h3 className='fw-bold mb-2'>Привет, {user?.name || 'Гость'}!</h3>
                                    <p className="mb-0 opacity-90">
                                        Готовы планировать питание? <br />
                                        У вас {days.length} дней впереди
                                    </p>
                                </div>
                                <Button
                                    variant='link'
                                    onClick={() => setWelcomeCollapsed(true)}
                                    className="text-white p-0"
                                    style={{ textDecoration: 'none', fontSize: '20px' }}
                                >
                                    ✕
                                </Button>
                            </div>

                            {/* Компонент, показывающий прогресс */}
                            <div className="mt-3 pt-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <small>Прогресс недели</small>
                                    <small className="fw-bold">3/7 дней</small>
                                </div>
                                <div className="progress" style={{ height: '8px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                                    <div className="progress-bar bg-white" style={{ width: '43%', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* План на неделю */}
                    <WeeklyPlan />
                </motion.div>
            ) : (
                <motion.div
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        className='d-flex align-items-center justify-content-between p-3 mb-3'
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '16px',
                            color: 'white',
                            cursor: 'pointer'
                        }}
                        onClick={() => setWelcomeCollapsed(false)}
                    >
                        <div className='d-flex align-items-center gap-2'>
                            <span style={{ fontSize: '24px' }}>👋</span>
                            <span className='fw-bold'>Привет!</span>
                        </div>
                        <span style={{ fontSize: '28px' }}>▼</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

    )

}

export default PlanBlock;
