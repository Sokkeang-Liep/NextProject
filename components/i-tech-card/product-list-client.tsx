"use client"

import { ProductResponse } from "@/lib/type/products"
import { Link } from "lucide-react"
import { use } from "react"
import { ProductCard } from "./product-card"

export default function ProductListClient({fetchProducts}: {fetchProducts: Promise<ProductResponse[]>}){

// recieved data from server to client component (how to get data from server oy ban) last used use effect and use state but now use hook 'use
// if use effect and state tich2 re-render that affect to security 

// So to get data from server to client must use 'use' line 15 and use ng get jea prop and have type promise and Respone jea ey 

 const products = use(fetchProducts) // this line is get data from server 

 console.log('product in client', products)
    return(
        <main className="container mx-auto">
                    <section className="grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            products.map((product, index) =>
                                <ProductCard
                                key={index}
                                images={[product.images[0]]}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                 />
                            
                            )
        
                        }
                        
                    </section>
                </main>
    )
}