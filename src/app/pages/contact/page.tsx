import { Contact } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mt-4">
      <h1>Контакты</h1>
      <Contact className="mb-3" size={48} />
      <p>Email: info@example.com</p>
      <p>Phone: +7 (123) 456-78-90</p>
    </div>
  );
}