import { safeParse, pipe, number, string, transform, parse } from "valibot"
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import axios from "axios"
import { toBoolean } from "../utils"

type ProductData = {
    [k: string]: FormDataEntryValue
}

// Añadir nuevo Producto
export async function addProduct(data: ProductData){
    try {
        // Validamos con Valibot
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })

        // Realizamos la petición
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })           
        } else {
            throw new Error('Datos no válidos')
        }
    } catch (error) {
        console.log(error)
    }
}

// Obtener Productos
export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`        
        const { data } = await axios(url)
        const result =  safeParse(ProductsSchema, data.data ) 

        if(result.success){
            return result.output
        } else {
            throw new Error('Hubo un error')
        }         
    } catch (error) {
        console.log(error)
    }
}

// Actualizar Producto
export async function getProductById(id: Product['id']){ 
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios(url) 
        const result = safeParse(ProductSchema, data.data)  
        if(result.success){
            return result.output
        } else {
            throw new Error('Hubo un error')
        } 
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data : ProductData, id: Product['id']){ 
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        // Validamos con Valibot
        const result = safeParse(ProductSchema,  {
            id: +id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())                           
        })
        console.log(result)

        // Realizamos la petición
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output )           
        } else {
            throw new Error('Datos no válidos')
        } 
    } catch (error) {
        console.log(error)
    }    
}

export async function deleteProduct(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)         
        
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id: Product['id']){  
    try {  
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
    
}
