import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Menu from "./Menu";
import { FaUsersRays } from "react-icons/fa6";
import { GiNextButton } from "react-icons/gi";
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { GiPreviousButton } from "react-icons/gi";
import { Select, SelectItem,Modal,ModalContent,ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { roles } from "./data";

const Alerta = withReactContent(Swal);

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getUsuarios();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const [Nombre, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Clave, setClave] = useState("");
  const [rol, setRol] = useState("");
  const [id, setId] = useState("0");
  const [Editar, setEditar] = useState(false);
  const [usuariosList, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Correo: Correo,
      Documento: Documento,
      Clave: Clave,
      rol: rol,
    })
      .then(() => {
        getUsuarios();
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

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      Nombre: Nombre,
      Correo: Correo,
      Documento: Documento,
      rol: rol,
    })
      .then(() => {
        getUsuarios();
        LimpiarCampos();

        Alerta.fire({
          title: <strong>Actualizado Correctamente</strong>,
          html: <i>El usuario {Nombre} fue actualizado con éxito</i>,
          icon: "info",
          timer: 3000,
        });
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "intente mas tarde"
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const deleteUsuario = (val) => {
    Swal.fire({
      title: "Confirmar eliminacion?",
      html: `<i>Esta Seguro de eliminar a <strong>${val.Nombre}</strong></i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Elimarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getUsuarios();
            LimpiarCampos();
            Alerta.fire({
              icon: "success",
              title: `${val.Nombre} Fue Eliminado.`,
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

  const LimpiarCampos = () => {
    setNombre("");
    setCorreo("");
    setDocumento("");
    setClave("");
    setRol("");
    setEditar(false);
  };

  const EditarUsuario = (val) => {
    setEditar(true);
    setNombre(val.Nombre);
    setCorreo(val.Correo);
    setDocumento(val.Documento);
    setRol(val.rol);
    setId(val.id);
  };

  const getUsuarios = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    Axios.get("http://localhost:3001/usuarios")
      .then((response) => {
        const usuarios = response.data.map((usuario) => {
          const nombreRol = usuario.rol;
          return {
            ...usuario,
            rol: nombreRol ? nombreRol : "Rol desconocido",
          };
        });
        setUsuarios(usuarios.slice(startIndex, endIndex));
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="absolute bg-white py-4 top-10 w-[95%] left-[2%] border-2 border-blue-500 z-20 h-[90%] rounded-lg overflow-auto overflow-x-hidden scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300 ">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />
      <Menu />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 top-20 relative ">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0"></div>
      </div>

      <div className="relative text-center top-32">
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-center">
                  Actualización de información
                </ModalHeader>
                <ModalBody>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Nombre
                  </label>
                  <input
                    value={Nombre}
                    type="text"
                    onChange={(event) => {
                      setNombre(event.target.value);
                    }}
                    placeholder="Ingrese su nombre"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    id="username"
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Documento
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Ingrese Una contraseña"
                    value={Documento}
                    type="text"
                    onChange={(event) => {
                      setDocumento(event.target.value);
                    }}
                  />
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Correo
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    placeholder="Correo"
                    value={Correo}
                    type="email"
                    onChange={(event) => {
                      setCorreo(event.target.value);
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={LimpiarCampos}
                    className="w-[75%] hover:bg-orange-300 hover:text-white "
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>

                  {Editar ? (
                    <div>
                      <button
                        onClick={update}
                        className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   text-white"
                      >
                        Actualizar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={add}
                      className="w-full bg-blue-400 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
                    >
                      Registrar
                    </button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="top-28 relative">
        <div className="section">
          <div className="container">
            <div className="">
              <div className="">
                <div className="section pb-5 pt-5 pt-sm-2 text-center top-5 hyphens-manual flex justify-center">
                  <img
                    className="relative left-[85%] top-4 w-48 h-auto"
                    src="./imagenes/Logo.PNG"
                    alt=""
                  />
                  <div className="flex justify-center text-2xl w-[60%] h-auto px-8 relative left-[25%] -top-14">
                    <p>
                      Bienvenido a la interfaz{" "}
                      <a className="underline decoration-Third">Usuarios</a>,
                      Donde tendras como opcion ver a los usuarios a tra vez de
                      una tabla y Registrar nuevas Asociadas. Te explicaremos
                      como funciona la interfaz:
                      <br />
                      <br /> <span className="text-Third">1.</span> El Circulo
                      en la{" "}
                      <a className="underline decoration-Third">
                        posicion Derecha
                      </a>{" "}
                      indica que esta mostrando el Registro para las asociadas.{" "}
                      <div className="flex justify-center py-8">
                        <AiOutlineDoubleRight className="text-primary animate-pulse duration-0 " />
                        <img src="./imagenes/RegistroUsu.PNG" />
                        <AiOutlineDoubleRight className="relative top-5 text-Third animate-pulse duration-0" />
                      </div>
                      <span className="text-primary">2.</span> Cuando le das
                      click al Circulo y cambia a la{" "}
                      <a className="underline decoration-primary">
                        posicion Izquierda
                      </a>{" "}
                      esta indicando que esta mostrando la tabla de todas las{" "}
                      <a className="underline decoration-primary">
                        asesoras Registradas.
                      </a>
                      <div className="flex justify-center py-8">
                        <AiOutlineDoubleLeft className="text-primary animate-pulse duration-0" />
                        <img src="./imagenes/UsuariosTabla.PNG" />
                        <AiOutlineDoubleLeft className="relative top-5 text-Third animate-pulse duration-0" />
                      </div>
                    </p>
                  </div>

                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />

                  <label for="reg-log"></label>
                  <div className="card-3d-wrap mx-auto drop-shadow-2xl left-24 relative">
                    <div className="card-3d-wrapper   rounded-lg  ">
                      <div className=" [backface-visibility:hidden] ">
                        <div className="center-wrap ">
                          <div className="relative -top-64 bg-white h-20 rounded-lg  ">
                            <h4 className="-left-[7%] top-5 rounded-lg w-[50%] text-3xl relative text-Third h-12   z-0">
                              Asesoras Registradas
                            </h4>
                            <FaUsersRays className="text-primary text-5xl relative left-[36%] -top-8" />
                            <div>
                              <div className="relative  sm:rounded-lg z-10 bg-gray-100 w-[106%] -left-[3%] -top-6 rounded-lg  shadow-2xl scrollbar scrollbar-thumb-gray-200 overflow-x-auto scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-40 ">
                                  <thead>
                                    <tr>
                                      <th className="px-10 py-3 bg-primary relative rounded-t-lg w-5 h-auto left-2 text-white">
                                        Nombre
                                      </th>
                                      <th className="px-10 py-3 bg-primary relative rounded-t-lg w-5 h-auto left-4 text-white">
                                        Correo
                                      </th>
                                      <th className="px-10 py-3 bg-primary relative rounded-t-lg w-5 h-auto left-6 text-white">
                                        Documento
                                      </th>
                                      <th className="px-20 py-5 bg-primary relative rounded-t-lg w-5 h-auto left-10 text-white">
                                        Acciones
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {usuariosList.map((val, key) => (
                                      <tr key={val.id}>
                                        <td className="px-8 py-3">
                                          {val.Nombre}
                                        </td>
                                        <td className="px-8 py-3">
                                          {val.Correo}
                                        </td>
                                        <td className="px-9 py-3">
                                          {val.Documento}
                                        </td>

                                        <td className="">
                                          <div
                                            className="flex px-10 py-5 relative -left-[5%]"
                                            role="group"
                                            aria-label="Basic example"
                                          >
                                            <Button
                                              type="button"
                                              onPress={onOpen}
                                              onClick={() => {
                                                EditarUsuario(val);
                                              }}
                                              className="focus:outline-none  focus:shadow-outline bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 left-12 relative rounded mr-2"
                                            >
                                              Editar
                                            </Button>

                                            <button
                                              type="button"
                                              onClick={() => {
                                                deleteUsuario(val);
                                              }}
                                              className="focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 left-12  relative rounded"
                                            >
                                              Eliminar
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                                <div className="flex justify-center mt-4 pb-8">
                                  <div className="h-10 w-11 relative bg-primary -right-[6px] rounded-lg">
                                    <GiPreviousButton className="relative w-7 h-7 left-2 top-1.5 rounded-none bg-primary text-white " />
                                  </div>
                                  <button
                                    className="cursor-pointer bg-gray-300 text-primary w-24 h-10 -right-[1%] relative rounded-lg hover:bg-Third hover:text-white"
                                    onClick={prevPage}
                                  >
                                    Anterior
                                  </button>
                                  <div className="h-10 w-11 relative bg-primary left-[117px] rounded-lg">
                                    <GiNextButton className="relative w-7 h-7 left-2 top-1.5 bg-primary text-white" />
                                  </div>
                                  <button
                                    className="cursor-pointer bg-gray-300 text-primary w-24 h-10  right-7 relative rounded-lg hover:bg-Third hover:text-white"
                                    onClick={nextPage}
                                  >
                                    Siguiente
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-back">
                        <div className="center-wrap">
                          <div className="z-0 relative top-[50%]">
                            <svg
                              viewBox="0 0 200 200"
                              xmlns="http://www.w3.org/2000/svg"
                              className="relative top-[420px] right-32"
                            >
                              <path
                                fill="#ffffff"
                                d="M35.9,-64.2C42.7,-58.2,41.8,-40.9,45.7,-28.3C49.7,-15.7,58.5,-7.9,61,1.5C63.6,10.8,59.8,21.5,54.5,31.9C49.3,42.3,42.6,52.2,33.2,56.6C23.9,61,12,59.8,-1.3,62.1C-14.7,64.5,-29.3,70.3,-35.1,63.9C-41,57.5,-38,38.9,-46.3,26.2C-54.7,13.5,-74.3,6.7,-79,-2.7C-83.8,-12.2,-73.6,-24.4,-63,-33.2C-52.4,-42,-41.4,-47.3,-30.9,-51.2C-20.3,-55,-10.1,-57.3,2.2,-61.1C14.5,-64.9,29.1,-70.2,35.9,-64.2Z"
                                transform="translate(100 100)"
                              />
                            </svg>
                          </div>
                          <div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8 h-[50rem] w-[60%] relative right-16 -top-[36rem] bg-white">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                              <div className="relative right-40 top-48">
                                <img
                                  className="mx-auto h-7 w-auto"
                                  src="./imagenes/Logo3.png"
                                />
                                <div className="relative mx-auto left-[230%]">
                                  <h1 className="relative right-10 text-Third">
                                    Fondo De Empleados
                                  </h1>
                                  <img
                                    src="./imagenes/FondoSgn.svg"
                                    className="relative w-auto h-[80%] top-[10rem] right-44"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <h2 className="mt-10 text-center text-primary text-3xl font-bold leading-9 -top-10 relative tracking-tight">
                                Registra Usuarios Aqui
                                <span className="text-Third">.</span>
                              </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm relative -top-14">
                              <form
                                className="space-y-0"
                                action="#"
                                method="POST"
                              >
                                <div>
                                  <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6  text-gray-900">
                                      Nombre
                                    </label>
                                  </div>
                                  <div className="mt-2">
                                    <input
                                      value={Nombre}
                                      id="username"
                                      type="text"
                                      onChange={(event) => {
                                        setNombre(event.target.value);
                                      }}
                                      required
                                      placeholder="Ingrese Su Nombre"
                                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                      Documento
                                    </label>
                                  </div>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      value={Documento}
                                      required
                                      onChange={(event) => {
                                        setDocumento(event.target.value);
                                      }}
                                      placeholder="Ingrese Su documento"
                                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                      Correo
                                    </label>
                                  </div>
                                  <div className="mt-2">
                                    <input
                                      value={Correo}
                                      type="email"
                                      required
                                      placeholder="Ingrese su Correo"
                                      onChange={(event) => {
                                        setCorreo(event.target.value);
                                      }}
                                      className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-gray-900">
                                      Contraseña
                                    </label>
                                    
                                  </div>
                                  <div className="mt-2">
                                    <input
                                      type="password"
                                      required
                                      placeholder="********"
                                      value={Clave}
                                      onChange={(event) => {
                                        setClave(event.target.value);
                                      }}
                                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
