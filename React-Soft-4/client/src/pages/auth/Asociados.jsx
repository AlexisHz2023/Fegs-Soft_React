import React, { useState, useEffect } from 'react';
import Asesora from './MenuAsesora';
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";

// Componente del Modal
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg">
                <button onClick={onClose} className="absolute top-2 right-2 text-xl">&times;</button>
                {children}
            </div>
        </div>
    );
};

const Asociados = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

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
        }
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRecords(data);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    const handleChange = (e) => {
        const filteredRecords = data.filter(record => {
            return record.nombre.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setRecords(filteredRecords);
    };

    const handleEdit = (row) => {
        setSelectedUser(row);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const columns = [
        {
            name: "Nombre",
            selector: row => row.nombre,
            sortable: true,
            style: {
                backgroundColor: 'rgb(238, 238, 240)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            }
        },
        {
            name: "Apellido",
            selector: row => row.apellido,
            sortable: true,
            style: {
                backgroundColor: 'rgb(238, 238, 240)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            }
        },
        {
            name: "Edad",
            selector: row => row.edad,
            sortable: true,
            style: {
                backgroundColor: 'rgb(238, 238, 240)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            }
        },
        {
            name: "Acciones",
            cell: row => <button onClick={() => handleEdit(row)} className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>,
            style: {
                backgroundColor: 'rgb(238, 238, 240)',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            }
        }
    ];

    function Loader() {
        return <div>
            <h1><img className='flex items-center justify-center w-full h-full bg-cover bg-center' src="./Imagenes/cargando2.gif" alt="" /></h1>
            <h3></h3>
            </div>
    }

    return (
        <div className=''>
            <Asesora />
            <div className="w-[95%] left-[2%] h-[90%] bg-white border-2 absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
                <div className="p-4 sm:ml-64">
                    <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <span className='text-primary'>Hola!,</span> Bienvenido a la interfaz de <span className='text-Third'>Asesora</span><span className='text-primary'>.</span>
                                </p>
                            </div>
                            <div className='py-0 left-24 relative '>
                                <img className='w-[100%] h-auto' src="./imagenes/AsesoraInicio.svg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className='pt-6'>
                        <input className='w-[25%] border-2 border-blue-500 outline-none py-2 px-9 rounded-lg' type="text"
                            onChange={handleChange} /> <CiSearch className='relative w-10 h-10 -top-9 pb-3 pl-0 text-Third' />
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

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <>
                    <div className="flex flex-col gap-1 text-center mb-4">
                        <h2 className="text-xl font-bold">Actualización de información</h2>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Nombre
                        </label>
                        <input
                            value={selectedUser ? selectedUser.nombre : ''}
                            type="text"
                            onChange={(event) => {
                                setSelectedUser({ ...selectedUser, nombre: event.target.value });
                            }}
                            placeholder="Ingrese su nombre"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Apellido
                        </label>
                        <input
                            value={selectedUser ? selectedUser.apellido : ''}
                            type="text"
                            onChange={(event) => {
                                setSelectedUser({ ...selectedUser, apellido: event.target.value });
                            }}
                            placeholder="Ingrese su apellido"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Edad
                        </label>
                        <input
                            value={selectedUser ? selectedUser.edad : ''}
                            type="number"
                            onChange={(event) => {
                                setSelectedUser({ ...selectedUser, edad: event.target.value });
                            }}
                            placeholder="Ingrese su edad"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                // Aquí puedes agregar la lógica para actualizar el registro
                                console.log('Actualizando:', selectedUser);
                                closeModal();
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Actualizar
                        </button>
                    </div>
                </>
            </Modal>
        </div>
    );
}

export default Asociados;
