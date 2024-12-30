import Image from "next/image";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="flex min-h-screen w-full font-inter justify-between">
          {children}
          <div className="auth-asset">
            <Image src='/icons/auth-image.svg' alt="svg" height={500} width={400} />
          </div>
      </main>
    );
  }
  