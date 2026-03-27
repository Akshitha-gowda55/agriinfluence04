import "@/styles/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "AgriInfluence",
  description: "Agricultural Ecommerce Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>

          <Header />

          <main>{children}</main>

          <Footer />

        </ThemeProvider>
      </body>
    </html>
  )
}