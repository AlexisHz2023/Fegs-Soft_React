import React from "react";
import { useState, useEffect, useMemo } from "react";
import Asesora from "./MenuAsesora";
import DataTable from "react-data-table-component";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { HiMiniUsers } from "react-icons/hi2";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { AiFillNotification } from "react-icons/ai";


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
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;
// Componente de filtrado
const FilterComponent = ({ filterText, onFilter }) => (
  <>
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
  const variants = ["underlined"];
  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Clave, setClave] = useState("");
  const [id, setId] = useState("0");

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Correo: Correo,
      Documento: Documento,
      Clave: Clave,
      rol: "3",
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
  };

  const LimpiarCampos = () => {
    setNombre("");
    setCorreo("");
    setDocumento("");
    setClave("");
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
      fetchData();
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

  const updateRecord = () => {
    console.log(selectedUser.Nombre);
    console.log(selectedUser.id);
    Axios.put("http://localhost:3001/updateaso", {
      id: selectedUser.id,
      Nombre: selectedUser.Nombre,
      Correo: selectedUser.Correo,
      Documento: selectedUser.Documento,
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado Correctamente",
          text: `El usuario ${selectedUser.Nombre} fue actualizado con éxito`,
          icon: "success",
          timer: 3000,
        });
        fetchData();
        closeModal();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.message === "Network Error"
              ? "Intente más tarde"
              : error.message,
        });
      });
  };

  const deleteUsuario = (selectedUser) => {
    Swal.fire({
      title: "Confirmar eliminacion?",
      html: `<i>Esta Seguro de eliminar a <strong>${selectedUser.Nombre}</strong></i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Holaaa");
        Axios.delete(`http://localhost:3001/delete/${selectedUser.id}`)
          .then(() => {
            fetchData();
            LimpiarCampos();
            Alerta.fire({
              icon: "success",
              title: `${selectedUser.Nombre} Fue Eliminado.`,
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo Eliminar!",
              footer:
                JSON.parse(JSON.stringify(error)).message === "Network Error"
                  ? "intente mas tarde"
                  : JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
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
    {
      name: "Acciones",
      cell: (row) => (
        <button
          type="button"
          onClick={() => {
            deleteUsuario(row);
          }}
          className="focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 -left-4 relative rounded"
        >
          Eliminar
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <Asesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2 absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
          <div className="px-2 py-28 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center z-10 relative -top-10 left-[200%] h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl text-gray-400 dark:text-gray-500 px-10">
                <AiFillNotification className="text-Third" /> <span className="text-primary">
                  Hola!,</span> Bienvenido, Aqui
                  puedes Registrar a los
                  <span className="text-Third"> asociados</span>
                  <span className="text-primary">.</span>
                </p>
              </div>
            </div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              
              </div>

              <div className="absolute z-0 top-40">
                <img
                 src="./imagenes/AsesoraInicio.svg" className="realtive z-0"/>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-1 -top-20 border-gray-50 bg-gray-100 rounded-xl shadow-2xl p-5 relative z-40">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <div className="mt-2">
                     {variants.map((variant) => (
                      <div>
                        <Input
                        type="text"
                        variant={variant}
                        label="Nombre"
                        value={Nombre}
                        id="username"
                        autocomplete="name"
                        required
                        onChange={(event) => {
                          setNombre(event.target.value);
                        }}
                        />
                      </div>
                     ))}
                    </div>
                  </div>

                  <div>
                    <div className="mt-2">
                     {variants.map((variant) => (
                      <div>
                        <Input
                        type="text"
                        variant={variant}
                        label="Documento"
                        value={Documento}
                        autocomplete="name"
                        required
                        onChange={(event) => {
                          setDocumento(event.target.value);
                        }}
                        />
                      </div>
                     ))}
                    </div>
                  </div>

                  <div>
                   
                    <div className="mt-2">
                     {variants.map((variant) => (
                      <div>
                        <Input
                        type="text"
                        variant={variant}
                        label="Correo"
                        value={Correo}
                        autocomplete="name"
                        required
                        onChange={(event) => {
                          setCorreo(event.target.value);
                        }}
                        />
                      </div>
                     ))}
                    </div>
                  </div>
                  <div>
                  
                    <div className="mt-2">
                     {variants.map((variant) => (
                      <div>
                        <Input
                        type="text"
                        variant={variant}
                        label="Contraseña"
                        value={Clave}
                        autocomplete="name"
                        required
                        onChange={(event) => {
                          setClave(event.target.value);
                        }}
                        />
                      </div>
                     ))}
                    </div>
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
          <div className="pt-6 bg-gray-100 top-10 relative rounded-lg">{subHeaderComponentMemo}</div>

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
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Documento
            </label>
            <input
              value={selectedUser ? selectedUser.Documento : ""}
              type="text"
              onChange={(event) => {
                setSelectedUser({
                  ...selectedUser,
                  Documento: event.target.value,
                });
              }}
              placeholder="Ingrese su documento"
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
