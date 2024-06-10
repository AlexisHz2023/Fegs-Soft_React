import React from "react";
import { useState, useEffect, useMemo } from "react";
import Asesora from "./MenuAsesora";
import DataTable from "react-data-table-component";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { roles } from "./data";
import { HiMiniUsers } from "react-icons/hi2";


import {
  Select,
  SelectItem,

  Button,
} from "@nextui-org/react";



//Este es un comentario de la rama Emanuel

// Este es una Rama de German
const Alerta = withReactContent(Swal);



const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Estilos para el campo de texto y el botón de limpiar
const TextField = styled.input`
  height: 44px;
  width: 260px;
  border-radius: 10rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;

const ClearButton = styled.button`
  border-radius: 0.5rem;
  height: 44px;
  width: 85px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4484d4;

  cursor: pointer;
  left: 23%;
  top: 45px;
  z-index: 10;
  color: white;
  position: relative;
  &:hover {
    background-color: #ccc;
  }
`;

// Componente de filtrado
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <ClearButton type="button" onClick={onClear}>
      Cancelar
    </ClearButton>

    <TextField
      id="search"
      type="text"
      placeholder="Ingresa el Dato"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />

    <CiSearch className="w-9 h-9 text-gray-500 -top-[40px] ps-1 relative" />
  </>
);

const Asociados = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [originalRecords, setOriginalRecords] = useState([]);

  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Clave, setClave] = useState("");
  const [rol, setRol] = useState("");
  const [id, setId] = useState("0");


  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Correo: Correo,
      Documento: Documento,
      Clave: Clave,
      rol: rol,
    })
    .then(() => {
      fetchData();
      LimpiarCampos();
      Alerta.fire({
        title: <strong>Creado Correctamente</strong>,
        html: <i>El usuario {Nombre} fue registrado con éxito</i>,
        icon: "success",
        timer: 3000,
      });
    })
    .catch(function (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        footer:
          JSON.parse(JSON.stringify(error)).message === "Network Error"
            ? "intente mas tarde"
            : JSON.parse(JSON.stringify(error)).message,
      });
    });
  }

  const LimpiarCampos = () => {
    setNombre("");
    setCorreo("");
    setDocumento("");
    setClave("");
    setRol("");
  };


  const fetchData = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/asociados");
      setRecords(response.data || []);
      setOriginalRecords(response.data || []); // Guardar los registros originales
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRecords(fetchData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleEdit = (row) => {
    setSelectedUser(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const updateRecord = async () => {
    try {
      await Axios.put(
        `http://localhost:3001/update/${selectedUser.id}`,
        selectedUser
      );
      Swal.fire({
        title: "Actualizado Correctamente",
        text: `El usuario ${selectedUser.Nombre} fue actualizado con éxito`,
        icon: "success",
        timer: 3000,
      });
      fetchData();
      closeModal();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.message === "Network Error"
            ? "Intente más tarde"
            : error.message,
      });
    }
  };

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

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        setRecords(originalRecords); // Reiniciar los registros filtrados a los originales
      }
    };

    const handleFilter = (e) => {
      const value = e.target.value;
      setFilterText(value);
      if (value === "") {
        setRecords(originalRecords); // Reiniciar los registros filtrados a los originales
      } else {
        const filteredRecords = originalRecords.filter((record) =>
          record.Nombre.toLowerCase().includes(value.toLowerCase())
        );
        setRecords(filteredRecords);
      }
    };

    return (
      <FilterComponent
        onFilter={handleFilter}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle, originalRecords]);

  function Loader() {
    return (
      <div>
        <h1>
          <img
            className="flex items-center justify-center w-full h-full bg-cover bg-center"
            src="./Imagenes/cargando2.gif"
            alt=""
          />
        </h1>
        <h3></h3>
      </div>
    );
  }

  return (
    <div className="">
      <Asesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2 absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
          <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <span className="text-primary">Hola!,</span> Bienvenido, Aqui
                  puedes Registrar a los
                  <span className="text-Third"> asociados</span>
                  <span className="text-primary">.</span>
                </p>
              </div>
            </div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <HiMiniUsers 
                  className="mx-auto h-20 w-auto text-Third "
                />
              
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      for="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        value={Nombre}
                        id="username"
                        name="email"
                        type="text"
                        autocomplete="email"
                        required
                        onChange={(event) => {
                          setNombre(event.target.value)
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        for="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Numero De Documento
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        value={Documento}
                        autocomplete="current-password"
                        required
                        onChange={(event) => {
                          setDocumento(event.target.value)
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        for="Correo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Correo
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        value={Correo}
                        type="email"
                        autocomplete="current-password"
                        required
                        onChange={(event) => {
                          setCorreo(event.target.value)
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        for="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contraseña
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                      value={Clave}
                        type="password"
                        autocomplete="current-password"
                        required
                        onChange={(event) => {
                          setClave(event.target.value)
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="px-8 pt-3 ">
                                  <Select
                                    isRequired
                                    label="Seleccione un rol"
                                    placeholder="roles"
                                    defaultSelectedKeys={[""]}
                                    className="max-w-xs pt-6 pb-8 z-10 "
                                    value={rol}
                                    onChange={(event) =>
                                      setRol(event.target.value)
                                    } // Cambiado a event.target.value
                                  >
                                    {roles.map(
                                      (
                                        rolItem // Cambiado a rolItem para evitar confusión de nombres
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

                  <div>
                  <Button
                                    onClick={add}
                                    className="w-full bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   text-white"
                                  >
                                    Registrar
                                  </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

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
              value={selectedUser ? selectedUser.Nombre : ""}
              type="text"
              onChange={(event) => {
                setSelectedUser({
                  ...selectedUser,
                  Nombre: event.target.value,
                });
              }}
              placeholder="Ingrese su nombre"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
            />
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Correo
            </label>
            <input
              value={selectedUser ? selectedUser.Correo : ""}
              type="text"
              onChange={(event) => {
                setSelectedUser({
                  ...selectedUser,
                  Correo: event.target.value,
                });
              }}
              placeholder="Ingrese su correo"
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
              onClick={updateRecord}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Actualizar
            </button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default Asociados;
