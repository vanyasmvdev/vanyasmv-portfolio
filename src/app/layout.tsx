// This layout is intentionally minimal.
// The real layout lives at app/[locale]/layout.tsx and is handled by next-intl middleware.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
