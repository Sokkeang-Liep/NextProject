export default async function PhotoPage({params} : {params: Promise<{id:String}>}){

 const {id}= await params;

 return(
    <div  className="w-2/4 h-50 bg-gray-300 flex justify-center items-center">
        Hello {id}
    </div>
 )

}