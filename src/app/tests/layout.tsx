'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const testLinks = [
    { name: 'Tests JS', path: '/tests/tests-js' },
    { name: 'Github', path: '/tests/github' },
    { name: 'Next.js', path: '/tests/nextjs' },
    { name: 'Objects', path: '/tests/objects' },
  ];

  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link href="/" className="me-3">Главная</Link>
        <Link href="/contact" className="me-3">Контакты</Link>
        {testLinks.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`me-3 ${pathname === link.path ? 'text-primary fw-bold' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}