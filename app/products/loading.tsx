import { SkeletonCard } from "@/components/i-skeletons/skeleton-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
    return(
       <main className="container mx-auto">
       <section className ="grid grid-cols-1 sm: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

       {
        //loop to show 15 skeleton cards 1st way 
        //  [...Array(15)].map((_, index) => <SkeletonCard key={index} />)

        //2nd way to show 15 skeleton cards
        Array.from({ length: 15 }).map((_, index) => <SkeletonCard key={index} />)

       }
       </section>
       </main>
    )
    

}