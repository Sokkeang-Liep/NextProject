import { UploadResponse } from "../type/product-response";
import { Category, ProductRequest } from "../type/products";

// Fetch Data from API product 
const baseAPI = process.env.NEXT_PUBLIC_API_URL

//request fetch product list 
export async function fetchAllProducts(){
                            // ` ` and {} = + means blus string tor knea 
  const data = await fetch(`${baseAPI}/api/v1/products`,{
    method: "GET",         // this API is method Get so must defined oy ke 
    headers: {      
        "Content-Type": "application/json"   //contentType just defined that this API is return in json 
    }
  })
  const respsonse = data.json()  //response jam yk data del convert jea json hz 

  return respsonse;
}

//Insert Product to API
export async function InsertProducts(product: ProductRequest){
                            
  const data = await fetch(`${baseAPI}/api/v1/products`,{
    method: "POST",         
    headers: {      
        "Content-Type": "application/json"   
    },
    body: JSON.stringify(product)  //this is convert to JOSON 
  })
  const respsonse = data.json()  
  return respsonse;
}
 
// Insert Images to server
export async function uploadImageToServer(file: File): Promise<UploadResponse> {
  if (!baseAPI) throw new Error("NEXT_PUBLIC_API_URL is missing");

  const formData = new FormData();
  // IMPORTANT: the API expects the field name "file"
  formData.append("file", file);

  const res = await fetch(`${baseAPI}/api/v1/files/upload`, {
    method: "POST",
    body: formData,
    // DO NOT set "Content-Type" manually for FormData
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${res.status} ${text}`);
  }
  return res.json();
}


//
export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${baseAPI}/api/v1/categories`);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}
