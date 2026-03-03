
export default async function Page() {

  const data = await fetch('https://api.vercel.app/blog')
  const response = await data.json()

  return (
    console.log(response),
    <ul>
      {response.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}