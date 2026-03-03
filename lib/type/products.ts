
export type ProductResponse = {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: ["https://media.istockphoto.com/id/495204892/photo/sneakers.jpg?s=612x612&w=0&k=20&c=QSkl09_Rx2lvayG93dWBmoCsVPThoAB1VgcSyh6Jy_4="]

}

export type ProductRequest = {
 title: string;
 price: number;
 description: string;
 Category: number;
 images: string[];

}


export type Category={
    id: number;
    name: string;
}



