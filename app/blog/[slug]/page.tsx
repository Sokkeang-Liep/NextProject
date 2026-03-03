import BlogComponents from "@/components/BlogComponent"
import { BlogResponse } from "@/lib/type/blog"

const BASE_URL = "https://jsonplaceholder.typicode.com"

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}){
    const { slug } = await params
      const response = await fetch(`${BASE_URL}/posts/${slug}`)
      const post: BlogResponse = await response.json() 
    return(
       <BlogComponents
        id={post.id}
        title={post.title}
        body={post.body}
        userId={post.userId}
       />
    )
}