export  type ProductResponse= {
    id:number;
    title:string;
    // slug:string;
    price:number;
    description:string;
    // category:ProductResponseCategory;
    images:string[];
}

export  type ProductResponseCategory = {
    id:number;
    name:string;
    slug:string;
}

export type productType = {
        id: number;
        title: string;
        description: string;
        price: number;     
        image: string;
        category: string;
}

export type ProductRequest = {
        title: string;
        price: number;     
        description: string;
        categoryId : number;
        images: string[];
}

export type UploadResponse = {
  originalname: string;
  filename: string;
  location: string;
};

export type Category = {
  id: number;
  name: string;
  image: string;
};
