import React from "react"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <div class="relative bg-gray-100">
      <Header />
      <main class="lg:relative">{children}</main>
      <Footer />
    </div>
  )
}
