import { Providers } from "@/components/Providers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>{children}</Providers>
  );
}
