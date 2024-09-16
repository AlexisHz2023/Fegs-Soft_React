import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Menu from "./Menu";
import { GiNextButton } from "react-icons/gi";
import { FaUsersRays } from "react-icons/fa6";
import { GiPreviousButton } from "react-icons/gi";
import {
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { roles } from "./data";
import Validation from "./Validation2";

const Alerta = withReactContent(Swal);

const Admin = () => {
  useEffect(() => {
    Swal.fire({
      title: "Informacion Importante!",
      icon: "info",
      html: '<p>Bienvenido a la interfaz Usuarios Donde tendras como opcion ver a los usuarios atra vez de una tabla y Registrar nuevas Asociadas. Te explicaremos como funciona la interfaz:</p>  <br />Cuando le das click al circulo y cambia a la posicion derecha indica que esta mostrando el registro para los asociados: <img class="Derecho" src="./imagenes/RegistroUsu.PNG" /> <br/> Cuando le das click al Circulo y cambia a la posicion izquierda esta indicando que esta mostrando la tabla de todas las asesoras Registradas:<br /><img class="izquierdo" src="./imagenes/UsuariosTabla.PNG" />',
      confirmButtonText: "Continuar",
      footer: "Por favor tener encuenta esta informacion",
      width: '50%'
      })
  }, []);
 

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const variants = ["underlined"];

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

  useEffect(() => {
    getUsuarios();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: values.name,
      Correo: values.email,
      Documento: values.Documento,
      Clave: values.password,
      rol: rol,
    })
      .then(() => {
        getUsuarios();
        LimpiarCampos();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario {values.name} fue registrado con éxito</i>,
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
    console.log(id, Nombre, Correo, Documento);
    Axios.put("http://localhost:3001/update", {
      id: id,
      Nombre: Nombre,
      Correo: Correo,
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
      confirmButtonText: "Si, Eliminarlo",
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
    setValues({
      name: "",
      Documento: "",
      email: "",
      password: "",
      rol: "",
    });
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
    <div className="absolute bg-white py-4 top-10 w-[95%] left-[2%] border-2 border-blue-500 z-20 h-[90%] rounded-lg overflow-hidden">
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
                <div className="section pb-5 pt-5 pt-sm-2 text-center top-8 left-[10%] hyphens-manual flex justify-center">
                  <img
                    src="./imagenes/HomeAdmin.svg"
                    className=" w-[50%] h-[50%] absolute top-[20%] left-[50%]"
                  />
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />

                  <label for="reg-log"></label>
                  <div className="card-3d-wrap mx-auto drop-shadow-xl -left-[10%] -top-40 max-w-md relative ">
                    <div className="card-3d-wrapper   rounded-lg  ">
                      <div className=" [backface-visibility:hidden] ">
                        <div className="center-wrap ">
                          <div className="relative -top-64 bg-white h-20 rounded-lg ">
                            <h4 className="-left-[7%] top-0 rounded-lg w-[50%] text-3xl relative text-Third h-12   z-0">
                              Asesoras Registradas
                            </h4>
                            <FaUsersRays className="text-primary text-5xl relative left-[36%] -top-14" />
                            <div className="">
                              <div className="relative  sm:rounded-lg z-10 bg-gray-100 w-[90%] h-1/4 -top-12 left-[5%] py-7 rounded-lg  shadow-2xl scrollbar scrollbar-thumb-primary overflow-x-auto scrollbar-track-gray-50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
                                <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-40 overflow-x-hidden  ">
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
                                      <th className="px-5 py-4 bg-primary relative rounded-t-lg w-5 h-auto left-10 text-white">
                                        Rol
                                      </th>
                                      <th className="px-5 py-4 bg-primary relative rounded-t-lg w-5 h-auto left-12 text-white">
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
                                        <td className="px-9 py-3">
                                          {val.rol_nombre}
                                        </td>
                                        

                                        <td className="">
                                          <div
                                            className="flex px-5 py-5 relative -left-[5%]"
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
                                    className="cursor-pointer bg-gray-200 text-primary w-24 h-10 -right-[1%] relative rounded-lg hover:bg-Third hover:text-white"
                                    onClick={prevPage}
                                  >
                                    Anterior
                                  </button>
                                  <div className="h-10 w-11 relative bg-primary left-[117px] rounded-lg">
                                    <GiNextButton className="relative w-7 h-7 left-2 top-1.5 bg-primary text-white" />
                                  </div>
                                  <button
                                    className="cursor-pointer bg-gray-200 text-primary w-24 h-10  right-7 relative rounded-lg hover:bg-Third hover:text-white"
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
                          <div className="z-0 relative top-[40%]">
                            <svg
                              viewBox="0 0 200 200"
                              xmlns="http://www.w3.org/2000/svg"
                              className="relative top-[10px] right-20"
                            >
                              <path
                                fill="#ffffff"
                                d="M35.9,-64.2C42.7,-58.2,41.8,-40.9,45.7,-28.3C49.7,-15.7,58.5,-7.9,61,1.5C63.6,10.8,59.8,21.5,54.5,31.9C49.3,42.3,42.6,52.2,33.2,56.6C23.9,61,12,59.8,-1.3,62.1C-14.7,64.5,-29.3,70.3,-35.1,63.9C-41,57.5,-38,38.9,-46.3,26.2C-54.7,13.5,-74.3,6.7,-79,-2.7C-83.8,-12.2,-73.6,-24.4,-63,-33.2C-52.4,-42,-41.4,-47.3,-30.9,-51.2C-20.3,-55,-10.1,-57.3,2.2,-61.1C14.5,-64.9,29.1,-70.2,35.9,-64.2Z"
                                transform="translate(100 100)"
                              />
                            </svg>
                          </div>
                          <div className="flex min-h-full flex-col justify-center px-6 py-5 lg:px-8 h-[20rem] rounded-lg w-[60%] relative right-3 -top-[36rem] bg-white">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
                              <div className="relative right-48 top-48">
                                <img
                                  className="mx-auto h-7 top-7 w-auto relative"
                                  src="./imagenes/Logo3.png"
                                />
                                <div className="relative mx-auto left-[230%]">
                                  <h1 className="relative right-28 text-Third">
                                    Fondo De Empleados
                                  </h1>
                                  <img
                                    src="./imagenes/FondoSgn.svg"
                                    className="relative w-auto h-[80%] top-[10rem] right-44 tracking-tight font-bold leading-9"
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
                                onSubmit={handleValidation}
                              >
                                <div>
                                 
                                  <div className="mt-2 relative">
                                    {variants.map((variant) => (
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
                                    ))}
                                  </div>
                                  {errors.name && (
                                    <p className="text-red-500 text-sm">
                                      {errors.name}
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <div className="flex items-center justify-between"></div>
                                  <div className="mt-2">
                                    {variants.map((variant) => (
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
                                    ))}
                                    {errors.Documento && (
                                      <p className="text-red-500 text-sm">
                                        {errors.Documento}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <div className="flex items-center justify-between"></div>
                                  <div className="mt-2">
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
                                      <p className="text-red-500 text-sm">
                                        {errors.email}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div>
  <div className="flex items-center justify-between"></div>
  <div className="mt-2">
    {variants.map((variant) => (
      <div>
        {/* Input para la contraseña */}
        <Input
          type="password"
          name="password"
          variant={variant}
          label="Contraseña"
          value={values.password}
          autocomplete="name"
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
      <div>
        {/* Input para confirmar contraseña */}
        <Input
          type="password"
          name="confirmPassword"
          variant={variant}
          label="Confirmar Contraseña"
          value={values.confirmPassword}
          autocomplete="name"
          required
          onChange={handleInput}
        />
      </div>
    ))}
    {errors.confirmPassword && (
      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
    )}
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
                                    type="submit"
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
