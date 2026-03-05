import ProductForm from "@/components/forms/product-form";
import { ToastContainer } from "react-toastify";

export default function ProductInsert(){

    return(

        <main>

          <div className="container w-100 mx-auto mt-20">
            <ToastContainer
                    position="top-right"
                    autoClose={3000}
            />
              <ProductForm/>
          </div>
            
        </main>
    )
}