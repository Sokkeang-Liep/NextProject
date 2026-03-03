
import { ProductResponse } from "@/lib/type/products"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "lucide-react"

export function ProductCard({
    images,
    title="Shoes",
    description="Best shoes in town",
    price=2,
}: ProductResponse) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src={images[0]}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction> 
          <Badge variant="secondary">{price}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="line-clamp-2">KO
         {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <button className="w-full">View Event</button>
      </CardFooter>
    </Card>
  )
}
