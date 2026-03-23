'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";


export default function DashboardPage(){
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch ('/api/auth/me')
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error('Not authenticated');
                }
                const data = await res.json();
                setUser(data.user);
            })
            .catch(() => {
                router.push('/login');
            })
    },[router])

    const handleLogout = async() => {
        await fetch('/api/auth/logout', {method: 'POST'});
        router.push('/login');
    };

    if (loading) {
        return (
            <Container className="min-vh-100 d-flex align-items-center justify-content-center">
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }
    
    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card.Header className="shadow-sm">
                        <h3 className="mb-0"></h3>
                    </Card.Header>
                    <Card.Body>
                        <h4>Welcome, {user?.email}!</h4>
                        <p className="text-muted">User ID: {user?.id}</p>
                        <p className="text-muted">Role: {user?.role || 'user'}</p>
                        <hr />
                        <p>This is your protected dashboard. Only authenticated users can see this.</p>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Button variant="danger" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Card.Footer>
                </Col>
            </Row>
        </Container>
    )
}