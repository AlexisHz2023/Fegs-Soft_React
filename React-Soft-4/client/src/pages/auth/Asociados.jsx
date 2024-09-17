import React, { useState, useEffect, useMemo } from "react";
import Asesora from "./MenuAsesora";
import DataTable from "react-data-table-component";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { Button, Input } from "@nextui-org/react";
import { AiFillNotification } from "react-icons/ai";
import Validation from "./Validation";



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

const TextField = styled.input`
  height: 44px;
  width: 260px;
  border-radius: 0rem;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Ingresa el Dato"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <CiSearch className="w-9 h-9 text-gray-500 -top-[0px] ps-1 relative right-64" />
  </>
);

const Asociados = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterText, setFilterText] = useState("");
  const variants = ["underlined"];
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [Nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [values, setValues] = useState({
    name: "",
    Documento: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleInput(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleValidation(event) {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    // Si no hay errores, llama a la función add
    if (Object.keys(validationErrors).length === 0) {
      add();
    }
  }

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: values.name,
      Correo: values.email,
      Documento: values.Documento,
      Clave: values.password,
      rol: "3",
    })
      .then(() => {
        fetchData();
        LimpiarCampos();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario {values.name} fue registrado con éxito</i>,
          icon: "success",
          timer: 3000,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          footer:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const LimpiarCampos = () => {
    setValues({
      name: "",
      Documento: "",
      email: "",
      password: "",
    });
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
              ? "Error en la solicitud"
              : error.message,
        });
      });
  };

  const deleteUsuario = (selectedUser) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>¿Está seguro de eliminar a <strong>${selectedUser.Nombre}</strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${selectedUser.id}`)
          .then(() => {
            fetchData();
            LimpiarCampos();
            Alerta.fire({
              icon: "success",
              title: `${selectedUser.Nombre} fue eliminado.`,
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No se pudo eliminar.",
              footer:
                JSON.parse(JSON.stringify(error)).message === "No se pudo eliminar"
                  ? "Intente más tarde"
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
          onClick={() => deleteUsuario(row)}
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
            src="./Imagenes/carga.gif"
            alt="loading"
          />
        </h1>
      </div>
    );
  }

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <Asesora />

      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2  absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
          <div className="px-2 py-48 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="flex items-center justify-center z-10 relative  left-[70%] h-32 w-[25%] -top-24 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-2xl text-gray-400 dark:text-gray-500 px-10">
                <AiFillNotification className="text-Third" />{" "}
                <span className="text-primary">Hola!,</span> Bienvenido, Aqui
                puedes Registrar a los
                <span className="text-Third"> asociados</span>
                <span className="text-primary">.</span>
              </p>
            </div>
            <div className="absolute z-0 top-96 right-80">
              <img
                src="./imagenes/AsesoraInicio.svg"
                className="realtive z-0"
              />
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm border-1 -top-16 border-gray-50 bg-gray-100 rounded-xl shadow-2xl p-20 right-[0%] relative">
              <form className="space-y-6" onSubmit={handleValidation}>
                <div className="grid grid-cols-1 gap-4 relative">
                  <div>
                    <h1 className="text-center text-3xl">Formulario</h1>
                    <div className="mt-2">
                      {variants.map((variant) => (
                        <div>
                          <Input
                            type="text"
                            name="name"
                            variant={variant}
                            label="Nombre"
                            value={values.name}
                            autocomplete="name"
                            required
                            onChange={handleInput}
                          />
                        </div>
                      ))}
                    </div>

                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    {variants.map((variant) => (
                      <div>
                        <Input
                          type="number"
                          name="Documento"
                          variant={variant}
                          label="Documento"
                          value={values.Documento}
                          autocomplete="name"
                          required
                          onChange={handleInput}
                        />
                      </div>
                    ))}
                    {errors.Documento && (
                      <p className="text-red-500 text-sm">{errors.Documento}</p>
                    )}
                  </div>
                  <div>
                    {variants.map((variant) => (
                      <div>
                        <Input
                          type="text"
                          name="email"
                          variant={variant}
                          label="Correo"
                          value={values.email}
                          autocomplete="name"
                          required
                          onChange={handleInput}
                        />
                      </div>
                    ))}
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                  <div>
                  {variants.map((variant) => (
                    <div key={variant}>
                      {/* Input para la contraseña */}
                      <Input
                        type="password"
                        name="password"
                        variant={variant}
                        label="Contraseña"
                        value={values.password}
                        autocomplete="new-password"
                        required
                        onChange={handleInput}
                      />
                    </div>
                  ))}
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="mt-2">
                  {variants.map((variant) => (
                    <div key={variant}>
                      {/* Input para confirmar la contraseña */}
                      <Input
                        type="password"
                        name="confirmPassword"
                        variant={variant}
                        label="Confirmar Contraseña"
                        value={values.confirmPassword}
                        autocomplete="new-password"
                        required
                        onChange={handleInput}
                      />
                    </div>
                  ))}
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>             
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                  >
                    Registrar
                  </Button>
                </div>
              </form>
            </div>
            <div className="top-36 relative">
              <h1 className="text-center text-2xl">Asociados Registrados<span className="text-Third">.</span></h1>
            <DataTable
              columns={columns}
              data={records}
              progressPending={loading}
              progressComponent={<Loader />}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              pagination
              paginationResetDefaultPage={resetPaginationToggle}
            />
            </div>
      
          </div>
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
