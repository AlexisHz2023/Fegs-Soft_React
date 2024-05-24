import Asesora from './MenuAsesora'
import DataTable from "react-data-table-component"
import { useEffect, useState } from 'react'


const Asociados = () => {
 
    const columns = [
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: "Apellido",
            selector: row => row.apellido,
            sortable: true
        },
        {
            name: "Edad",
            selector: row => row.edad,
            sortable: true
        },

    ]

    const data = [
        {
            nombre: "German",
            apellido: "Perez",
            edad: 25,
        },
        {
            nombre: "Alexis ",
            apellido: "Perez",
            edad: 25
        },
        {
            nombre: "Samuel",
            apellido: "Perez",
            edad: 25,
        },
        {
            nombre: "Carlos",
            apellido: "Perez",
            edad: 25,
        },
        {
            nombre: "Manuela",
            apellido: "Perez",
            edad: 25,
        },
        {
            nombre: "Ximena",
            apellido: "Perez",
            edad: 25,
        },
    

    ]

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRecords(data);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (e) => {
        const filteredRecords = data.filter(record => {
            return record.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        }) 
        setRecords(filteredRecords)
    }

    function Loader() {
        return <div>
            <h1>Cargando...</h1>
            <h3>Fondo de empleados</h3>
        </div>
    }
 

  return (
    <div className=''>
      <Asesora></Asesora>
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2  absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
      <div className="p-4 sm:ml-64">
   <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div className="grid grid-cols-3 gap-4 mb-4">
         <div className="flex items-center justify-center h-24  bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
            <span className='text-primary'>Hola!,</span> Bienvenido a la interfaz de <span className='text-Third'>Asesora</span><span className='text-primary'>.</span>

            </p>
         </div>
        
         <div className='py-0 left-24 relative '>
         <img className='w-[100%] h-auto' src="./imagenes/AsesoraInicio.svg" alt="" />
         
         </div>
   
              
   
      </div>   
   </div>

   <div>
    <input type="text" 
    onChange={handleChange}/>
   </div>
   
   <DataTable 
   title="Usuarios Registrados"
   columns={columns}
   data={records}
   pagination
   paginationPerPage={4}
   selectableRows
   fixedHeader
   progressPending={loading}
   progressComponent={<Loader />}

   />

   
     
        </div>
      </div>
    </div>
     
      



 
  )
}

export default Asociados
