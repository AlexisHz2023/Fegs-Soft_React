import React, { useState, useEffect, useMemo } from 'react';
import MenuAsesora from './MenuAsesora'
import DataTable from 'react-data-table-component';
import Axios from "axios";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";




const TextField = styled.input`
  height: 44px;
  width: 260px;
  border-radius: 10rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;

// Componente para la barra de búsqueda
const FilterComponent = ({ filterText, onFilter }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      id="search"
      type="text"
      placeholder="Ingresa el Dato"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className='-top-5 relative'
    />
    <CiSearch className="w-9 h-9 text-gray-500 -top-[20px] ps-1 right-[30%] relative" />
  </div>
);

const Beneficios = () => {
  // Estado de la aplicación

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [records, setRecords] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funciones para abrir y cerrar los modales
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);

  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);

  const openModal3 = () => setIsOpen3(true);
  const closeModal3 = () => setIsOpen3(false);

  // Fetch de datos
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:3001/asociados");
      setRecords(response.data || []);
      setOriginalRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect para fetch de datos
  useEffect(() => {
    fetchData();
  }, []);

  

  // Columns para la tabla de datos
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.Nombre,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.Correo,
      sortable: true,
    },
    {
      name: "Documento",
      selector: (row) => row.Documento,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => handleEdit(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
  ];

  // Manejador para el filtro
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value);
    if (value === "") {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter((record) =>
        record.Nombre.toLowerCase().includes(value.toLowerCase())
      );
      setRecords(filteredRecords);
    }
  };

  // Componente de la barra de búsqueda memorizado
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
        setRecords(originalRecords);
      }
    };

    return (
      <FilterComponent
        onFilter={handleFilter}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, originalRecords]);

  // Loader para la tabla
  function Loader() {
    return (
      <div>
        <h1>
          <img
            className="flex items-center justify-center w-full h-full bg-cover bg-center"
            src="./Imagenes/cargando2.gif"
            alt="Cargando"
          />
        </h1>
        <h3></h3>
      </div>
    );
  }




  return (
    <div className=''>
      <MenuAsesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2  absolute z-10 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">

<div className="p-10 sm:ml-64">
<div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
<div className="grid grid-cols-3 gap-4 mb-4">
   <div className="flex items-center justify-center h-24  bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p className="text-2xl text-gray-400 dark:text-gray-500">
      <span className='text-primary'>Hola!,</span> Bienvenido a la interfaz de <span className='text-Third'>Asesora</span><span className='text-primary'>.</span>
      
      </p>
   </div>
</div> 

<div className="flex flex-wrap justify-center gap-4 p-6">
        
            <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                    <svg width="24" height="24" fill="#FFFFFF">
                        <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1-1-1-.448-1-1 .448-1 1-1z"></path>
                    </svg>
                </figure>
                <h4 className="py-2 text-white font-bold">Ahorros Voluntarios</h4>
                <p className="text-base leading-7 text-white font-semibold space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <p className="text-sm leading-7 text-slate-300 space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro est numquam ipsa consequatur provident fugiat quaerat cupiditate temporibus cum?</p>
                <div className="pt-5 pb-2 flex justify-center">
                    <button onClick={openModal1} className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">Entrar</button>
                </div>
            </div>

       
            <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                    <svg width="24" height="24" fill="#FFFFFF">
                        <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1-1-1-.448-1-1 .448-1 1-1z"></path>
                    </svg>
                </figure>
                <h4 className="py-2 text-white font-bold">Ahorros Obligatorios</h4>
                <p className="text-base leading-7 text-white font-semibold space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <p className="text-sm leading-7 text-slate-300 space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro est numquam ipsa consequatur provident fugiat quaerat cupiditate temporibus cum?</p>
                <div className="pt-5 pb-2 flex justify-center">
                    <button onClick={openModal2} className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">Button</button>
                </div>
            </div>

       
            <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                    <svg width="24" height="24" fill="#FFFFFF">
                        <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1-1-1-.448-1-1 .448-1 1-1z"></path>
                    </svg>
                </figure>
                <h4 className="py-2 text-white font-bold">Ahorros Creditos</h4>
                <p className="text-base leading-7 text-white font-semibold space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                <p className="text-sm leading-7 text-slate-300 space-y-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro est numquam ipsa consequatur provident fugiat quaerat cupiditate temporibus cum?</p>
                <div className="pt-5 pb-2 flex justify-center">
                    <button onClick={openModal3} className="w-36 h-10 font-semibold rounded-md bg-indigo-100 hover:scale-90 duration-500">Button</button>
                </div>
            </div>
        </div>

         {/* Modal 1 */}
      {isOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
          <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
            <h2 className="text-2xl font-bold mb-4">Ahorros Voluntarios</h2>
            <p>Aqui puedes ver a los asociados seleccionados</p>
            <div>
              
            <div className="pt-6">{subHeaderComponentMemo}</div>

            <DataTable
            columns={columns}
            data={Array.isArray(records) ? records : []}
            pagination
            paginationPerPage={4}
            selectableRows
            fixedHeader
            progressPending={loading}
            progressComponent={<Loader />}
            theme="black"
          />
              
            </div>
            <button onClick={closeModal1} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal 2 */}
      {isOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-50 rounded-lg">
          <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
          <h2 className="text-2xl font-bold mb-4">Ahorros Voluntarios</h2>
            <p>Aqui puedes ver a los asociados seleccionados</p>
            <div>
              
            <div className="pt-6">{subHeaderComponentMemo}</div>

            <DataTable
            columns={columns}
            data={Array.isArray(records) ? records : []}
            pagination
            paginationPerPage={4}
            selectableRows
            fixedHeader
            progressPending={loading}
            progressComponent={<Loader />}
            theme="black"
          />
              
            </div>
            <button onClick={closeModal2} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

       {/* Modal 3 */}
       {isOpen3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-50 rounded-lg">
          <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
          <h2 className="text-2xl font-bold mb-4">Ahorros Voluntarios</h2>
            <p>Aqui puedes ver a los asociados seleccionados</p>
            <div>
              
            <div className="pt-6">{subHeaderComponentMemo}</div>

            <DataTable
            columns={columns}
            data={Array.isArray(records) ? records : []}
            pagination
            paginationPerPage={4}
            selectableRows
            fixedHeader
            progressPending={loading}
            progressComponent={<Loader />}
            theme="black"
          />
              
            </div>
            <button onClick={closeModal3} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
</div>
 </div>
  </div>
    </div>
  )
}

export default Beneficios
