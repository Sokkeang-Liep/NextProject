import BlogComponents from "@/components/BlogComponent";
import { BlogResponse } from "@/lib/type/blog";

const BASE_URL = "https://jsonplaceholder.typicode.com"

export default async function BlogPage(){
     // Fetch users from API
      const response = await fetch(`${BASE_URL}/posts`)
      const posts: BlogResponse[] = await response.json() 
    
    return(
     
        <main className="container mx-auto p-6">
             <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

               {posts.map((blog, index) => (
                             <BlogComponents 
                             key={blog.id}
                             id={index} 
                             title={blog.title} 
                             body={blog.body} 
                             userId={blog.userId} />
               ))}
             </section>
           </main>
    )
}