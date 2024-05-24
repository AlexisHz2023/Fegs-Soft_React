import React, { useState } from 'react';
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";

const Tabla = () => {
  // Datos de ejemplo (reemplázalos con tus propios datos)
  const [data, setData] = useState([
    { id: 1, productName: 'Product 1', color: 'Red', category: 'Category A', price: '$100', rol: 'Admin' },
    { id: 2, productName: 'Product 2', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 3, productName: 'Product 3', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 4, productName: 'Product 4', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 6, productName: 'Product 5', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 7, productName: 'Product 6', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 8, productName: 'Product 7', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 9, productName: 'Product 8', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    { id: 10, productName: 'Product 9', color: 'Blue', category: 'Category B', price: '$200', rol: 'Admin' },
    // Agrega más datos aquí
  ]);

  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);

  // Número de elementos por página
  const itemsPerPage = 5;

  // Calcular los índices del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los datos de la página actual
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="absolute">
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg z-10'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Aquí va tu código JSX para encabezados de tabla */}
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 '>
          <tr>
            <th className='px-10 py-3'>#</th>
            <th className='px-10 py-3'>Nombre</th>
            <th className='px-10 py-3'>Correo</th>
            <th className='px-10 py-3'>Usuario</th>
            <th className='px-10 py-3'>Rol</th>
            <th className='px-10 py-5'> Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td className='px-10 py-3'>{item.productName}</td>
              <td className='px-10 py-3'>{item.color}</td>
              <td className='px-10 py-3'>{item.category}</td>
              <td className='px-10 py-3'>{item.price}</td>
              <td className='px-10 py-3'>{item.rol}</td>
              <td className=''>
                    <div
                      className='flex px-10 py-4 relative -left-[25%]'
                      role='group'
                      aria-label='Basic example'
                    >
                      <button
                        type='button'
                        onClick={() => {
                          EditarUsuario(val);
                        }}
                        className='focus:outline-none  focus:shadow-outline bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 left-10 relative rounded mr-2'
                      >
                        Editar
                      </button>
                      <button
                        type='button'
                        onClick={() => {
                          deleteUsuario(val);
                        }}
                        className='focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 left-14  relative rounded'
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div className="text-center bg-gray-100 w-[50%] h-10 -top-2 relative left-52 rounded-lg">
      <SlArrowLeft className='relative left-5 top-3' />

        {[...Array(Math.ceil(usuariosList.length / itemsPerPage))].map((_, index) => (
          <button className='bg-gray-100 text-primary px-2 -top-2 relative' key={index + 1} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
        <SlArrowRight className='relative left-[90%] -top-7' />
      </div>
    </div>
    </div>
  );
};

export default Tabla;
