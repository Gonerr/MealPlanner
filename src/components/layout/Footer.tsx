import { Col, Container, Row } from "react-bootstrap";
import styled from 'styled-components';

const Footer = () => {

  const NavLinks = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
  `;

  const NavLink = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  color: #64748b;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;

  &:hover {
    color: #2c3e50;
    border-bottom: 1px solid #4A76A7;
  }
`;


    return (
        <footer style={{ 
        backgroundColor: '#fafafa',
        padding: '3rem 0 2rem',
        marginTop: '4rem',
        borderTop: '1px solid #eaeaea'
      }}>
        <Container>
          <Row style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            rowGap: '2rem'
          }}>
            <Col lg={4} md={6} style={{
              display:'flex',
              flexDirection:'column',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <svg viewBox="0 0 16 16" fill="currentColor"
                  style={{
                    width:'24px', 
                    height:'24px', 
                    color:'#4A76A7', 
                    opacity:0.8,
                    transition:'opacity 0.2s'}}>
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
                  <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-6Z"/>
                </svg>
                <h5 style={{
                  fontSize:'1.1rem',
                  fontWeight:500,
                  color:'#2c3e50',
                  margin:0,
                  letterSpacing:'-0.3px'
                }}>
                  Домашняя кухня
                </h5> 
              </div>
              <p style={{
                color:'#94a3b8',
                fontSize:'0.9rem',
                lineHeight:1.5,
                margin:0,
                maxWidth: '250px'
              }}>
                Планируйте меню, готовьте с удовольствием
              </p>
            </Col>

            <Col lg={4} mg={12}>
                  <NavLinks>
                    <NavLink href='#'>
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                      </svg>
                      <span>Личный кабинет</span>
                    </NavLink>

                    <NavLink href='#'>
                      {/* Иконка книги */}
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                        <path d="M1 2.828c.885-.37 2.154-.769 4-.828 1.843-.06 3.11.336 4 .828v9.996C8.474 11.468 6.927 10.996 5 11c-1.927.004-3.464.535-4 .996V2.828zM11 2c1.941.06 3.202.458 4 .828v9.996c-.536-.46-2.073-.992-4-.996-1.846.004-3.115.458-4 .996V2.828c.88-.492 2.2-.88 4-.828z"/>
                      </svg>
                      <span>База рецептов</span>
                    </NavLink>

                    <NavLink href='#'>
                      {/* Иконка сообщества/люди */}
                      <svg className="nav-icon" viewBox="0 0 16 16" fill="currentColor" width="20" height="20">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216Z"/>
                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
                      </svg>
                      <span>Сообщество</span>
                    </NavLink>
                  </NavLinks>
            </Col>

            <Col lg={4} mg={6} style={{
              display:'flex',
              flexDirection:'column',
              gap:'1rem'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.5rem'
              }}>
                <svg style={{
                  width: '18px',
                  height: '18px',
                  color: '#e74c3c',
                  opacity: 0.8,
                  marginRight: '0.25rem',
                  display: 'inline-block',
                  verticalAlign: 'middle'
                }} viewBox="0 0 16 16" fill="currentColor">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748Z"/>
                </svg>
                <span style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>С любовью для домашних поваров</span>
                <div style={{color:'#94a3b8', fontSize:'0.85rem'}}>
                  @ {new Date().getFullYear()} ДомашняяКухня.ру
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer> 
    )
}

export default Footer;