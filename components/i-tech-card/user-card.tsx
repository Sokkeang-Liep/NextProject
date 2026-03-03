// src/components/users/user-card.tsx
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UseresResponse } from "@/lib/type/users"
import { Badge } from "lucide-react"

export function UserCard({
  name,
  email,
  avatar,
  id,
}: UseresResponse) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">


      {/* Avatar */}
      <img
        src={avatar || "https://via.placeholder.com/400x400?text=No+Avatar"}
        alt={name}
        className="relative z-10 aspect-video w-full object-cover brightness-75 hover:brightness-100 transition-all duration-300"
      />

      {/* Card Content */}
      <CardHeader className="relative z-30 p-4">
        
        <CardTitle className="text-lg font-semibold text-black">{name}</CardTitle>
        <CardDescription className="text-sm text-black line-clamp-1">
          {email}
        </CardDescription>
      </CardHeader>

      {/* Footer */}
      <CardFooter className="relative z-30 p-4">
        <button className="w-full bg-indigo-500 text-white font-medium py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          View Profile
        </button>
      </CardFooter>
    </Card>
  )
}
