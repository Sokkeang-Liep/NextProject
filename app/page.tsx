// src/app/page.tsx
import ProductListClient from "@/components/i-tech-card/product-list-client"
import { ModeToggle } from "@/components/mode-toggle"
import { fetchAllProducts } from "@/lib/data/product"
import { Metadata } from "next"
import Link from "next/link"

// this is a meta when we run it shows title on nav 
// This is Work on Server Compoenet only it doens't work on Client componenent 
export const metadata: Metadata = {
  title: 'Shopee',
  description: 'Shopee Provide all Styles of Clothes',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      
{/* This is we call from client component (to show client coponent) on server side */}
{/* pel hav mk use bos prop jol { fetchAllProducts()}  */}
      <main>
        <ProductListClient fetchProducts={ fetchAllProducts()}/>
      </main>
     

      {/* Features Section */}
      <section className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* You can add feature cards here later */}
       
      </section>
    </div>
  )
}
