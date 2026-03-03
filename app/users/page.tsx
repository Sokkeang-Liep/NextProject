import { UserCard } from "@/components/i-tech-card/user-card"
import { UseresResponse } from "@/lib/type/users"


const BASE_URL = "https://api.escuelajs.co"

export default async function UserPage() {
  // Fetch users from API
  const response = await fetch(`${BASE_URL}/api/v1/users`)
  const users: UseresResponse[] = await response.json()

  return (
    <main className="container mx-auto p-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <UserCard
            key={index}
            id={user.id}
            name={user.name}
            email={user.email}
            avatar={user.avatar}
          />
        ))}
      </section>
    </main>
  )
}
