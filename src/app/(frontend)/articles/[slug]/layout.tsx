export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center flex-col">{children}</div>
  )
}
