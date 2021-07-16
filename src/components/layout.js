import React from "react"
import Header from "./header"
import Footer from "./footer"

export default function Layout({ children }) {
  return (
    <div className="relative bg-gray-100">
      <Header />
      <main className="lg:relative">{children}</main>
      <Footer />
    </div>
  )
}
