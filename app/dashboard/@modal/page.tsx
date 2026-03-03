import { Children } from "react";

export default function PhotoModal({params} : {params: Promise<[id] params>}){
    
    return(
        <Modal>
            {children}
        </Modal>
    )
}