'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, LogIn, Mail } from 'lucide-react'
import { Button, Alert, Card, Col, Container, Form, Row } from "react-bootstrap";

interface SignInBlockProps {
    onSwitchToSignUp?: () => void;
}

export default function SignInBlock({ onSwitchToSignUp }: SignInBlockProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="shadow-lg border-0 rounded-4">
                        <Card.Body className="p-5">
                            <div className="text-center mb-4">
                                <div className="bg-white rounded-circle shadow-sm d-inline-flex p-3 mb-3">
                                    <LogIn size={32} className="text-primary"/>
                                </div>
                                <h2 className="h3 mb-2">Sign in with email</h2>
                                <p className="text-muted">Sign in to continue working</p>
                            </div>

                            {error && (
                                <Alert variant="danger" className="mb-4">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small">Email address</Form.Label>
                                    <div className="position-relative">
                                        <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                        <Form.Control
                                            placeholder="Email"
                                            type="email"
                                            value={email}
                                            disabled={loading}
                                            className="ps-5 py-2"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text-muted small">Password</Form.Label>
                                    <div className="position-relative">
                                        <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                            className="ps-5 py-2"
                                            required
                                        />
                                    </div>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="dark"
                                    className="w-100 py-2 mb-3"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign in'}
                                </Button>

                                <div className="text-center">
                                    <Button 
                                        variant="link" 
                                        className="text-muted text-decoration-none small p-0"
                                        disabled={loading}
                                        onClick={onSwitchToSignUp}
                                    >
                                        Don't have an account? Sign up
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}