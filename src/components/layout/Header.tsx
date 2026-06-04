"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Navbar, Button, Badge } from "react-bootstrap";
import { FaUserLock, FaUtensils } from "react-icons/fa";
import { selectMenuStats } from "../../features/menu/menuSlice";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
    // const isAdminMode = useSelector(selectIsAdminMode);
    const stats = useSelector(selectMenuStats);
    const pathname = usePathname();

    const router = useRouter();
    const [user, setUser] = React.useState<any>(null);

    const isAdminPage = pathname?.startsWith("/admin");
    const isAdmin = user?.role === "admin";

    React.useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => setUser(data.user))
            .catch(() => {});
    }, []);

    return (
        <Navbar
            variant="light"
            className="border-bottom border-gray-300 shadow-sm py-2"
            style={{
                position: "sticky",
                minHeight: "3rem",
                top: 0,
                zIndex: 1000,
                background:
                    "linear-gradient(to right, #fff 0%, #fff 60%, #b8d94a 100%)",
                backdropFilter: "blur(14px)",
                borderBottom: "1px solid #eef1e6",
            }}
        >
            <Container fluid className="px-5">
                {/* Левая часть - логотип/название */}
                <Navbar.Brand className="d-flex align-items-center me-0">
                    <span
                        style={{
                            width: "34px",
                            height: "34px",
                            padding: "1.2em",
                            background: "#c0dd4b",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        🍃
                    </span>
                    <span className="fw-semibold fs-2 text-dark mx-4">
                        NeMenu
                    </span>
                </Navbar.Brand>

                {/* Правая часть - кнопка переключения режима */}
                {isAdmin && (
                    <div className="ms-auto">
                        <Button
                            variant={isAdminPage ? "warning" : "outline-dark"}
                            size="sm"
                            onClick={() =>
                                user?.role === "admin"
                                    ? router.push("/admin")
                                    : router.push("/")
                            }
                            style={{
                                borderRadius: "6px",
                                borderWidth: "1px",
                                transition: "all 0.2s",
                                fontWeight: 500,
                            }}
                        >
                            {isAdminPage ? "Админ режим" : "Меню"}
                        </Button>
                    </div>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
//
