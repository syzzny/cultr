import type { Metadata } from 'next';
import '@/styles/global.css';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';

export const metadata: Metadata = {
  title: 'CULTR',
  description: '문화생활 큐레이션 뉴스레터',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}