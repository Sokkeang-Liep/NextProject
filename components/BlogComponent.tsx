import { BlogResponse } from "@/lib/type/blog";

export default function BlogComponents(
    {
        id,
        userId,
        title,
        body,
    }:BlogResponse  
) {
  return (
<div className="w-[300px] p-4 border rounded-lg m-4">
    <h1>UserId: {userId} </h1>
    <hr />
    <h2>Title: {title}</h2>
    <hr />
    <p>Body: {body}</p>

</div>
  )
}
