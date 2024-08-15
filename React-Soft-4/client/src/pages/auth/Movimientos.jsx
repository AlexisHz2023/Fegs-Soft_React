import React, { useState } from "react";
import MenuAsesora from './MenuAsesora'
import { IoWalletOutline } from "react-icons/io5";
import { Select, SelectItem } from "@nextui-org/react";
import { beneficios } from "./tiposbene";
import { FaMoneyBillTransfer } from "react-icons/fa6";




const Movimientos = () => {
    const [rol, setRol] = useState("");
  return (
    <div className=''>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <MenuAsesora />
        <div className="w-[95%] left-[2%] h-[90%] bg-white border-4  absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
        <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            
        <div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl sm:text-center">
      <h2 class="text-3xl font-bold tracking-tight text-Third sm:text-4xl">Consulte los movimientos aqui.</h2>
    </div>
    <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
      
      <div class="p-8 sm:p-10 lg:flex-auto text-center text-primary">
        <FaMoneyBillTransfer
        className='w-28 h-28 relative -top-[10%] left-[41%] '/>
        <input type="text"
        placeholder='Ingrese el numero de Documento'
        className='bg-gray-100  relative -top-5  z-20 text-gray-900 sm:text-sm rounded-lg block w-full p-4'
        />

<div className="py-5 text-center">
                  <Select
                  className="max-w-xs pt-6 pb-8 mx-w-xs"
                  isRequired
                  label="Seleccione el tipo de Beneficio"
                  defaultSelectedKeys={[""]}
                  value={rol}
                  onChange={(event) =>
                    setRol(event.target.value)
                  }
                  >
                    {beneficios.map (
                      (
                        rolItem
                      ) => (
                        <SelectItem
                        key={rolItem.value}
                        value={rolItem.value}
                        >
                          {rolItem.label}
                        </SelectItem>
                      )
                    )}
                  </Select>
                </div>

                <div className="text-white">
                    <button className="bg-Third p-2 rounded-lg hover:bg-primary">Consultar</button>
                </div>

        <div class="mt-10 flex items-center gap-x-4">
          <h4 class="flex-none text-sm font-semibold leading-6 text-blue-300">Consulta los Movimientos</h4>
          <div class="h-px flex-auto bg-gray-100"></div>
        </div>
        <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
         
          
         
          
        </ul>
      </div>
      <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
        <div class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-300 lg:flex lg:flex-col lg:justify-center lg:py-16">
         
        </div>
      </div>
    </div>
  </div>
</div>




        </div>
        </div>
        </div>

    </div>
  )
}

export default Movimientos
