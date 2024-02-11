import { AdminLayout } from '@/components/Admin';

export default function AdminRootLayout({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  return <AdminLayout>{children}</AdminLayout>;
}
