import ProductForm from '@/components/forms/product-form';
import { ProductCard } from '@/components/i-tech-card/product-card'
import { ProductResponse } from '@/lib/type/products';
import { basename } from 'path';
import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;   

 //create function to get data from api
// 1way to fectch data
// async function loadProduct(){
//     const response = await fetch(`${BASE_URL}/api/v1/products` ,{
//         method: "GET"
//     })
//     const products: ProductResponse[] = await response.json();
//     return products;
// }

export default async  function ProductPage(){
    // 1way to fectch data
    // const products = await loadProduct()

    // // 2way to fectch data
    const response = await fetch(`${BASE_URL}/api/v1/products`)
    const products: ProductResponse[] = await response.json();

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




        //  <div className="container w-100 mx-auto">
        //               <ProductForm/>
        //           </div>

    )
}
