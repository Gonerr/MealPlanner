'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, UserRoundPlusIcon } from 'lucide-react'
import { Button, Alert, Card, Col, Container, Form, Row } from "react-bootstrap";

interface SignUpBlockProps {
    onSwitchToSignIn?: () => void;
}

export default function SignUpBlock({ onSwitchToSignIn }: SignUpBlockProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) => {
        const errors = [];
        if (password.length < 6) errors.push('at least 6 characters');
        if (!/[A-Z]/.test(password)) errors.push('one uppercase letter');
        if (!/[0-9]/.test(password)) errors.push('one number');
        return errors;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!email || !password  || !confirmPassword)  {
            setError('Enter email and password');
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError('Enter a valid email');
            setLoading(false);
            return;
        }
        
        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0){
            setError(`Password must contain: ${passwordErrors.join(', ')}`);
            setLoading(false);
            return;
        }

        if(password != confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                if (onSwitchToSignIn) {
                    onSwitchToSignIn();
                }
                // Очищаем форму
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            router.push('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Signup failed');
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
                                    <UserRoundPlusIcon size={32} className="text-primary"/>
                                </div>
                                <h2 className="h3 mb-2">Create an account to continue</h2>
                                <p className="text-muted">Please enter your email and password to create an account.</p>
                            </div>

                            {error && (
                                <Alert variant="danger" className="mb-4">
                                    {error}
                                </Alert>
                            )}

                            {success && (
                                <Alert variant="success" className="mb-4">
                                    {success}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="text-muted small">Email address</Form.Label>
                                    <div className="position-relative">
                                        <Mail size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
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
                                            disabled={loading}
                                            className="ps-5 py-2"
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <Button
                                            variant="link"
                                            className="position-absolute top-50 end-0 translate-middle-y me-2 p-0"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{textDecoration:'none'}}
                                            >
                                                {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                                        </Button>
                                    </div>
                                    <Form.Text className="text-muted">
                                        Password must contain at least 6 characters, one uppercase letter and one number
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="text muted small">
                                        Confirm Password 
                                    </Form.Label>

                                    <div className="position-relative">
                                        <Lock size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"/>
                                        <Form.Control
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            value={confirmPassword}
                                            disabled={loading}
                                            className="ps-5 py-2"
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <Button
                                                variant="link"
                                                className="position-absolute top-50 end-0 translate-middle-y me-2 p-0"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                style={{textDecoration: 'none'}}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={16}/> : <Eye size={16}/>}


                                            </Button>
                                    </div>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="dark"
                                    disabled={loading}
                                    className="w-100 py-2 mb-3"
                                >
                                    {loading ? 'Creating an account...' : 'Create an account'}
                                </Button>

                                <div className="text-center">
                                    <Button 
                                        variant="link" 
                                        className="text-muted text-decoration-none small p-0"
                                        disabled={loading}
                                        onClick={onSwitchToSignIn}
                                    >
                                        Have an account already? Sign in
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