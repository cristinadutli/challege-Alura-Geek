const productsList = async () => {
    try {
        const res = await fetch("http://localhost:3000/products");
        return await res.json();
    } catch (err) {
        console.log(err);
    }
};

const crearProduct = (name,price,image) =>{
    return fetch ("http://localhost:3000/products",{
        method:"POST",
        headers:{
            "content-Type": "application/json",
        },
        body:JSON.stringify({
            name,
            price,
            image

        })
    }).then((res)=>res.json()).catch((err)=> console.log(err))

}
    
      const eliminarProduct = async(id)=>{
        try {
            await fetch(`http://localhost:3000/products/${id}`,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                }
            })
            console.log(`Producto con id ${id} eliminado`)
        } catch (error) {
            console.log(err);
        }

      }

export const servicesProducts = {
    productsList,
    crearProduct,
    eliminarProduct
};