import { useNavigate, Form, ActionFunctionArgs, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"

export type ProductDetailsProps = {
  product : Product
}

export async function action({params} : ActionFunctionArgs){   
  if(params.id !== undefined)
  await deleteProduct(+params.id)
  return redirect('/')
}

export default function ProductDetails( {product}: ProductDetailsProps) {

  const navigate = useNavigate()

  const fetcher = useFetcher()

  const isAvailable = product.availability

  return (
    <tr className="border-b ">
    <td className="p-3 text-lg text-gray-800">
      {product.name}
    </td>
    <td className="p-3 text-lg text-gray-800">
      { formatCurrency(product.price) }

    </td>
    <td className="p-3 text-lg text-gray-800">

      <fetcher.Form method="POST">
        <button
          type="submit"
          name="id"
          value={product.id}
          className={`${isAvailable ? "text-black": "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
        >
          {isAvailable ? 'Disponible': 'No Disponible'}
        </button>        

      </fetcher.Form>

    </td>
    <td className="p-3 text-lg text-gray-800 ">
      <div className="flex gap-2 items-center">
      <button
          onClick={() => navigate(`productos/${product.id}/editar`)}
          className='rounded-lg bg-indigo-600 w-full uppercase p-3 text-xs font-bold text-white text-center  hover:bg-indigo-500'
          >
          Editar
        </button>

      <Form 
        className="w-full"
        method="POST"
        action={`productos/${product.id}/eliminar`}
        onSubmit={ (e) => {
          if(!confirm('Eliminar?'))
            e.preventDefault()
        }}
        >
        <input 
          type="submit"
          className='rounded-lg bg-red-600  hover:bg-red-500 w-full uppercase p-3 text-xs font-bold text-white text-center '

          value="Eliminar"
        />


      </Form>
      </div>
       
    </td>
</tr> 
  )
}
