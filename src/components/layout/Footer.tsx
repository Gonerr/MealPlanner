import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const Footer = () => {
    const NavLinks = styled.div`
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-direction: row;

        @media (max-width: 768px) {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    `;

    const NavLink = styled.a`
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0.5rem;
        color: #2c3e50;
        text-decoration: none;
        font-size: 0.95rem;
        padding: 0.5rem 0;
        border-radius: 12px;
        transition: all 0.3s ease;
        backgroud: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);

        svg {
            transition: transform 0.2 ease, color 0.2 ease;
        }

        border-bottom: 1px solid transparent;

        &:hover {
            color: #8cb32b;
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);

            svg {
                transform: scale(1.1);
                color: #b8d94a;
            }
        }

        @media (max-width: 768px) {
            width: 100%;
            max-width: 200px;
        }
    `;

    return (
        <footer
            style={{
                background:
                    "radial-gradient(circle at 20% 50%, #d9ef9a 0%, #ffffff 50%, #f0f7e6 100% )",
                padding: "4rem 0 2rem",
                marginTop: "4rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Container fluid className="px-5">
                <Row
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        rowGap: "2rem",
                    }}
                >
                    <Col
                        lg={4}
                        md={6}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.75rem",
                            }}
                        >
                            <div
                                style={{
                                    background:
                                        "linear-gradient(135deg, #b8d94a, #8cb32b)",
                                    borderRadius: "12px",
                                    padding: "8px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow:
                                        "0 4px 12px rgba(184, 217, 74, 0.3)",
                                }}
                            >
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="white"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        transition: "transform 0.2s",
                                    }}
                                >
                                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                    <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-6Z" />
                                </svg>
                            </div>
                            <h5
                                style={{
                                    fontSize: "1.2rem",
                                    fontWeight: 600,
                                    background:
                                        "linear-gradient(135deg, #5a6e2f, #8cb32b)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text",
                                    color: "transparent",
                                    margin: 0,
                                    letterSpacing: "-0.3px",
                                }}
                            >
                                Домашняя кухня
                            </h5>
                        </div>
                        <p
                            style={{
                                color: "#5a6e2f",
                                fontSize: "0.9rem",
                                lineHeight: 1.5,
                                margin: 0,
                                maxWidth: "250px",
                                opacity: 0.8,
                            }}
                        >
                            Планируйте меню, готовьте с удовольствием
                        </p>
                    </Col>

                    <Col lg={4} mg={12}>
                        <NavLinks>
                            <NavLink href="#">
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    width="22"
                                    height="22"
                                >
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                </svg>
                                <span>Личный кабинет</span>
                            </NavLink>

                            <NavLink href="#">
                                {/* Иконка книги */}
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    width="22"
                                    height="22"
                                >
                                    <path d="M1 2.828c.885-.37 2.154-.769 4-.828 1.843-.06 3.11.336 4 .828v9.996C8.474 11.468 6.927 10.996 5 11c-1.927.004-3.464.535-4 .996V2.828zM11 2c1.941.06 3.202.458 4 .828v9.996c-.536-.46-2.073-.992-4-.996-1.846.004-3.115.458-4 .996V2.828c.88-.492 2.2-.88 4-.828z" />
                                </svg>
                                <span>База рецептов</span>
                            </NavLink>

                            <NavLink href="#">
                                {/* Иконка сообщества/люди */}
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    width="22"
                                    height="22"
                                >
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216Z" />
                                    <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                </svg>
                                <span>Сообщество</span>
                            </NavLink>
                        </NavLinks>
                    </Col>

                    <Col
                        lg={4}
                        mg={6}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-end",
                                gap: "0.75rem",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    background: "rgba(184, 217, 74, 0.2)",
                                    padding: "0.5rem 1rem",
                                    borderRadius: "50px",
                                    backdropFilter: "blur(5px)",
                                }}
                            >
                                <svg
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        color: "#e74c3c",
                                    }}
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                >
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748Z" />
                                </svg>
                                <span
                                    style={{
                                        color: "#5a6e2f",
                                        fontSize: "0.9rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    С любовью для домашних поваров
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#8cb32b",
                                        fontSize: "0.85rem",
                                        fontWeight: 500,
                                    }}
                                >
                                    @ {new Date().getFullYear()}{" "}
                                    ДомашняяКухня.ру
                                </span>
                                <div
                                    style={{
                                        width: "4px",
                                        height: "4px",
                                        background: "#b8d94a",
                                        borderRadius: "50%",
                                    }}
                                />
                                <span
                                    style={{
                                        color: "#94a3b8",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    Все права защищены
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
