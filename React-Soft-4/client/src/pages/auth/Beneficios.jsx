import React, { useState, useEffect, useMemo } from "react";
import MenuAsesora from "./MenuAsesora";
import DataTable from "react-data-table-component";
import Axios from "axios";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useDisclosure } from "@nextui-org/react";
import withReactContent from "sweetalert2-react-content";
import {  Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import { Select, SelectItem } from "@nextui-org/react";
import { beneficios } from "./tiposbene";


const TextField = styled.input`
  height: 44px;
  width: 260px;
  border-radius: 10rem;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;

const Alerta = withReactContent(Swal);

const FilterComponent = ({ filterText, onFilter }) => (
  
  <div style={{ display: "flex", alignItems: "center" }}>
    <div>
    <TextField
      id="search"
      type="text"
      placeholder="Ingresa el Dato"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="top-5 relative"
    />
    <CiSearch className="w-9 h-9 text-gray-500 -top-[20px] ps-1 right-[0%] relative" />
    </div>
  </div>
);

const Beneficios = () => {
  const [Vista, setVista] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);
  const [isOpen8, setIsOpen8] = useState(false);
  const [isOpen9, setIsOpen9] = useState(false);
  const [isOpen10, setIsOpen10] = useState(false);
  const [records, setRecords] = useState([]);
  const [rol, setRol] = useState("");
  const [selectedUser, setSelectedUser] = useState({
  idahorros: null,
  vista: '',
  programado: '',
  vacacional: '',
  previo_vivienda: ''
  });
  const [selectedUser2, setSelectedUser2] = useState({
    idobligatorio: null,
    ahorro_ordinario: '',
    ahorro_permanente: '',
  });
  const [selectedUser3, setSelectedUser3] = useState({
    idcreditos: null, 
    rotativo: '',
    SEC: '',
    novedades_varias: '',
    compra_cartera: '',

  });
  const [filterText, setFilterText] = useState("");
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [DocumentoBene, setDocumento] = useState("");
  const [DocumentoBli, setDocumentoBli] = useState("");
  const [DocumentoCredi, setDocumentoCredi] = useState("");
  

  const openModal4 = () => setIsOpen4(true);
  const closeModal4 = () => setIsOpen4(false);

  const openModal5 = () => setIsOpen5(true);
  const closeModal5 = () => setIsOpen5(false);

  const openModal6 = () => setIsOpen6(true);
  const closeModal6 = () => setIsOpen6(false);

  const openModal7 = () => setIsOpen7(true);
  const closeModal7 = () => setIsOpen7(false);

  const openModal8 = () => setIsOpen8(true);
  const closeModal8 = () => setIsOpen8(false);

  const openModal9 = () => setIsOpen9(true);
  const closeModal9 = () => setIsOpen9(false);

  const openModal10 = () => setIsOpen10(true);
  const closeModal10 = () => setIsOpen10(false);


  const add = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3001/NuevoBligatorio", {
      Documento: Documento,
    })
      .then(() => {
        fetchObligatorios();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario fue asociado con éxito</i>,
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



  const addvolu = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3001/NuevoVolu", {
      DocumentoBli: DocumentoBli,
    })
      .then(() => {
        fetchData();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario fue asociado con éxito</i>,
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

  const addcredi = (e) => {
    e.preventDefault()
    Axios.post("http://localhost:3001/NuevoCredi", {
      Documento: Documento,
    })
      .then(() => {
        fetchCreditos();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario fue asociado con éxito</i>,
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

  const addbeneficio = (e) => {
    e.preventDefault();

    if (!DocumentoBene || !rol) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }

    // Convertir rol a número si es un string
    const tipoBeneficio = Number(rol);

    if (isNaN(tipoBeneficio)) {
      Swal.fire({
        icon: "error",
        title: "Tipo de beneficio no válido",
        text: "Por favor, seleccione un beneficio válido.",
      });
      return;
    }

    Axios.post("http://localhost:3001/NuevoBeneficio", {
      Documento: DocumentoBene,
      tipoBeneficio: tipoBeneficio, // Asegúrate de que sea numérico
    })
      .then(response => {
        console.log("Respuesta del servidor:", response);
        fetchCreditos();
        Alerta.fire({
          title: <strong>Creado Correctamente</strong>,
          html: <i>El usuario fue asociado con éxito</i>,
          icon: "success",
          timer: 3000,
        });
      })
      .catch(function (error) {
        console.error("Error completo:", error); // Imprime el error completo
        const errorMessage = error.response ? error.response.data : "Error desconocido";
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorMessage,
          footer: error.message === "Network Error" ? "Intente más tarde" : error.message,
        });
      });
};
  
const deleteAhorroObligatorio = (selectedUser) => {
  Swal.fire({
    title: "Confirmar eliminación?",
    html: `<i>¿Está seguro de eliminar los ahorros obligatorios de <strong>${selectedUser.Nombre}</strong>?</i>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/EliminarAhorroObligatorio/${selectedUser.idUsuario}`)
        .then(() => {
          fetchData(); // Actualiza la lista de usuarios
          Alerta.fire({
            icon: "success",
            title: `Los ahorros obligatorios de ${selectedUser.Nombre} fueron eliminados.`,
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar.",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
          });
        });
    }
  });
};


const deleteAhorroVoluntario = (selectedUser) => {
  console.log(selectedUser.idahorros)
  Swal.fire({
    title: "Confirmar eliminación?",
    html: `<i>¿Está seguro de eliminar los ahorros voluntarios de <strong>${selectedUser.Nombre}</strong>?</i>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/EliminarAhorroVoluntario/${selectedUser.idUsuario}`)
        .then(() => {
          fetchData(); // Actualiza la lista de usuarios
          Alerta.fire({
            icon: "success",
            title: `Los ahorros voluntarios de ${selectedUser.Nombre} fueron eliminados.`,
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar.",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
          });
        });
    }
  });
};


const deleteCredito = (selectedUser) => {
  console.log("ID seleccionado para eliminación:", selectedUser.idcreditos);  // Verifica el ID seleccionado
  Swal.fire({
    title: "Confirmar eliminación?",
    html: `<i>¿Está seguro de eliminar los créditos de <strong>${selectedUser.idUsuario}</strong>?</i>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/EliminarCredito/${selectedUser.usuariocredi}`)
        .then(() => {
          fetchData(); 
          Alerta.fire({
            icon: "success",
            title: `Los créditos de ${selectedUser.Nombre} fueron eliminados.`,
            showConfirmButton: false,
            timer: 2000,
          });
        })
        .catch((error) => {
          console.log("Error en Axios.delete:", error);  // Verifica el error en Axios
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo eliminar.",
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"
              ? "Intente más tarde"
              : JSON.parse(JSON.stringify(error)).message,
          });
        });
    }
  });
};

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:3001/tblvoluntarios");
      setRecords(response.data || []);
      setOriginalRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchObligatorios = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:3001/tblobligatorios");
      setRecords(response.data || []);
      setOriginalRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCreditos = async () => {
    setLoading(true);
    try {
      const response = await Axios.get("http://localhost:3001/tblcreditos");
      setRecords(response.data || []);
      setOriginalRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const columnsVoluntarios = [
    { name: "Usuario", selector: (row) => row.idUsuario, sortable: true },
    { name: "Nombre", selector: (row) => row.Nombre, sortable: true },
    { name: "Documento", selector: (row) => row.Documento, sortable: true },
    { name: "Vista", selector: (row) => row.vista, sortable: true },
    { name: "Programado", selector: (row) => row.programado, sortable: true },
    { name: "vacacional", selector: (row) => row.vacacional, sortable: true },
    {
      name: "Previo vivienda",
      selector: (row) => row.previo_vivienda,
      sortable: true,
    },
    // {
    //   name: "Seguimiento",
    //   selector: (row) => row.seg_ahorro_voluntario,
    //   sortable: true,
    // },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
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
      name: "eliminar",
      cell: (row) => (
        <button
        type="button"
          onClick={() => deleteAhorroVoluntario(row)}
          className="focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 -left-4 relative rounded"
        >
          Eliminar
        </button>
      ),
    },
  ];

  const columnsObligatorios = [
    { name: "usuario", selector: (row) => row.idUsuario, sortable: true },
    { name: "Nombre", selector: (row) => row.nombreUsuario, sortable: true },
    { name: "Documento", selector: (row) => row.documentoUsuario, sortable: true },
    { name: "ahorro_ordinario", selector: (row) => row.ahorro_ordinario, sortable: true },
    {
      name: "Ahorro Permanente",
      selector: (row) => row.ahorro_permanente,
      sortable: true,
    },
    // {
    //   name: "seg_ahorro_obligatorio",
    //   selector: (row) => row.seg_ahorro_obligatorio,
    //   sortable: true,
    // },

    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => handleEdit2(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
    {
      name: "eliminar",
      cell: (row) => (
        <button
          type="button"
          onClick={() => deleteAhorroObligatorio(row)}
          className="focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 -left-4 relative rounded"
        >
          eliminar
        </button>
      ),
    },
  ];

  const columnsCreditos = [
    { name: "Usuario", selector: (row) => row.idUsuario, sortable: true },
    { name: "Nombre", selector: (row) => row.nombreCredi, sortable: true },
    { name: "Documento", selector: (row) => row.documentoCredi, sortable: true },
    { name: "rotativo", selector: (row) => row.rotativo , sortable: true },
    { name: "SEC", selector: (row) => row.SEC, sortable: true },
    {
      name: "Novedades Varias",
      selector: (row) => row.novedades_varias ,
      sortable: true,
    },
    {
      name: "Compra Cartera",
      selector: (row) => row.compra_cartera,
      sortable: true,
    },
    // {
    //   name: "Seguimiento Crédito",
    //   selector: (row) => row.seg_credito,
    //   sortable: true,
    // },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => handleEdit3(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
    {
      name: "eliminar",
      cell: (row) => (
        <button
        type="button"
          onClick={() => deleteCredito(row)}
          className="focus:outline-none focus:shadow-outline bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 -left-4 relative rounded"
        >
          Eliminar
        </button>
      ),
    },
  ];

  const handleEdit = (row) => {
    setSelectedUser(row);
    openModal4(true);
  };

  const handleEdit2 = (row) => {
    setSelectedUser2(row);
    openModal6(true);
  };

  const handleEdit3 = (row) => {
    setSelectedUser3(row);
    openModal8(true);
  };

  const updateRecord = () => {
    if (!selectedUser.idahorros || selectedUser.vista === "" || selectedUser.programado === "" || selectedUser.vacacional === "" || selectedUser.previo_vivienda === "") {
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        text: "Por favor complete todos los campos antes de actualizar.",
      });
      return;
    }
  
    Axios.put("http://localhost:3001/updateVolu", {
      idahorros: selectedUser.idahorros,  // Asegúrate de incluir el `id`
      vista: selectedUser.vista,
      programado: selectedUser.programado,
      vacacional: selectedUser.vacacional,
      previo_vivienda: selectedUser.previo_vivienda,
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado Correctamente",
          text: `El usuario  fue actualizado con éxito`,
          icon: "success",
          timer: 3000,
        });
        fetchData(); // Asumiendo que esto refresca la lista de datos
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data || error.message,
        });
      });
  };

  const updateOblig = () => {
    if (!selectedUser2.idobligatorio || selectedUser2.ahorro_ordinario === "" || selectedUser2.ahorro_permanente === "") {
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        text: "Por favor complete todos los campos antes de actualizar.",
      });
      return;
    }
  
    Axios.put("http://localhost:3001/updateOblig", {
      idobligatorio: selectedUser2.idobligatorio,
      ahorro_ordinario: selectedUser2.ahorro_ordinario,
      ahorro_permanente: selectedUser2.ahorro_permanente,
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado Correctamente",
          text: `El usuario ${selectedUser.idobligatorio} fue actualizado con éxito`,
          icon: "success",
          timer: 3000,
        });
        fetchData(); // Asumiendo que esto refresca la lista de datos
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data || error.message,
        });
      });
  };

  const updateCredi = () => {
    if (!selectedUser3.idcreditos || selectedUser3.rotativo === "" || selectedUser3.SEC === "" || selectedUser3.novedades_varias === "" || selectedUser3.compra_cartera === "") {
      Swal.fire({
        icon: "error",
        title: "Faltan datos",
        text: "Por favor complete todos los campos antes de actualizar.",
      });
      return;
    }
  
    Axios.put("http://localhost:3001/updateCredi", {
      idcreditos: selectedUser3.idcreditos,
      rotativo: selectedUser3.rotativo,
      SEC: selectedUser3.SEC,
      novedades_varias: selectedUser3.novedades_varias,
      compra_cartera: selectedUser3.compra_cartera,
    })
      .then(() => {
        Swal.fire({
          title: "Actualizado Correctamente",
          text: `El usuario ${selectedUser3.idcreditos} fue actualizado con éxito`,
          icon: "success",
          timer: 3000,
        });
        fetchData(); 
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data || error.message,
        });
      });
  };

  

  

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value);
    if (value === "") {
      setRecords(originalRecords);
    } else {
      const filteredRecords = originalRecords.filter((record) =>
        Object.values(record).some((field) =>
          field.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setRecords(filteredRecords);
    }
  };

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
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <MenuAsesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-2 absolute z-10 top-[5%] rounded-lg overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
          <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center justify-center h-24 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  <span className="text-primary">Hola!,</span> Bienvenido a la
                  interfaz de <span className="text-Third">Asesora</span>
                  <span className="text-primary">.</span>
                </p>
              </div>
            </div>

            <div className="flex-none relative left-[5%] m-4 w-[90%] rounded-xl  hover:bg-gray-100 border-4 hover:scale-110 duration-700 p-5">
                <h1 className="text-center text-2xl text-primary">Registra a los <span className="text-Third">Asociados</span></h1>
                <button
                  onClick={() => {
                    fetchCreditos();
                    setIsOpen1(false);
                    setIsOpen2(false);
                    setIsOpen3(false);
                    setIsOpen4(false);
                    setIsOpen10(!isOpen10);
                  }}
                  className="flex-none relative left-[45%] w-28 mt-8 px-5 p-10 py-4 text-center text-sm font-medium text-white bg-Third hover:bg-primary rounded-lg"
                >
                  Click Aqui
                </button>
              </div>



            <div className="flex flex-wrap justify-center gap-4 p-6">
              <div className="flex-none m-4 bg-white border-4 max-w-[300px] rounded-xl hover:bg-gray-200 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-primary rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M18.799 7.101L12.029.63a2.122 2.122 0 0 0-2.876.001L2.384 7.1a1.01 1.01 0 0 0 1.346 1.505l.804-.72v7.93a2.146 2.146 0 0 0 2.145 2.145h6.6a2.146 2.146 0 0 0 2.145-2.145V7.884l.807.723a1.01 1.01 0 1 0 1.346-1.505zm-8.896-5.59a.101.101 0 0 1 .136 0l6.371 5.558H3.53l6.373-5.558zM6.503 8.862H12.001v7.476H5.859a.101.101 0 0 1-.101-.101V8.862h.745zm11.134 0H13.5v7.376a.101.101 0 0 1-.101.101H12.0V8.862h5.637z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-primary pt-3">
                  Ahorro Voluntario
                </h2>
                <div className="text-sm text-gray-400">
                  Planificación a corto plazo
                </div>
                <button
                  onClick={() => {
                    fetchData();
                    setIsOpen1(!isOpen1);
                    setIsOpen2(false);
                    setIsOpen3(false);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-Third rounded-lg"
                >
                  Ver más
                </button>
              </div>
              <div className="flex-none m-4 bg-white border-4 max-w-[300px] rounded-xl hover:bg-gray-200 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-primary rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M16.06 1.22L14.06 0a3.246 3.246 0 0 0-4.12 0L5.94 1.22a3.246 3.246 0 0 0-1.94 3V20c0 1.11.89 2 2 2h10a2 2 0 0 0 2-2V4.22a3.246 3.246 0 0 0-1.94-3zM9 22v-8h6v8H9zm9-2c0 .55-.45 1-1 1H9v-8h6v8h1c.55 0 1-.45 1-1V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22c0-.87-.51-1.64-1.28-1.96L12 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-primary pt-3">
                  Ahorro Obligatorio
                </h2>
                <div className="text-sm text-gray-400">
                  Planificación a largo plazo
                </div>
                <button
                  onClick={() => {
                    fetchObligatorios();
                    setIsOpen1(false);
                    setIsOpen2(!isOpen2);
                    setIsOpen3(false);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-Third rounded-lg"
                >
                  Ver más
                </button>
              </div>
              <div className="flex-none m-4 bg-white border-4 max-w-[300px] rounded-xl hover:bg-gray-200 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-primary rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M10.5 16.5v-3H7v3H4.5v-3H3v3c0 .825.675 1.5 1.5 1.5H4.5a1.5 1.5 0 0 0 1.5-1.5v-3h3zM20 7.5H10.5V9H20zM10.5 12H20v1.5H10.5zM16 0H8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16zM8 1.5h8a6.506 6.506 0 0 1 6.5 6.5 6.506 6.506 0 0 1-6.5 6.5H8A6.506 6.506 0 0 1 1.5 8 6.506 6.506 0 0 1 8 1.5z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-primary pt-3">
                  Créditos
                </h2>
                <div className="text-sm text-gray-400">
                  Créditos disponibles
                </div>
                <button
                  onClick={() => {
                    fetchCreditos();
                    setIsOpen1(false);
                    setIsOpen2(false);
                    setIsOpen3(!isOpen3);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-Third rounded-lg"
                >
                  Ver más
                </button>
              </div>
            </div>
   
            

            {loading ? (
              <Loader />
            ) : (
              <div>
                {isOpen1 && (
                  <DataTable
                    columns={columnsVoluntarios}
                    data={records}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                  />
                )}            
                {isOpen2 && (
                  <DataTable
                    columns={columnsObligatorios}
                    data={records}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                  />
                )}
                {isOpen3 && (
                  <DataTable
                    columns={columnsCreditos}
                    data={records}
                    pagination
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                  />
                )}
              </div>
            )}

            {isOpen4 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Aqui puedes agregar los estados de cuenta
                  </h2>
                  <p className="text-center">
                    Ingresa los valores requeridos para mostrar el estados de cuenta 
                  </p>
                  <p className="text-center ">
                  Aviso: Para mermar valores al saldo añada un signo "-" antes de la cantidad deseada.
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">
                      <div className="flex-none">
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Vista"
                          required
                          onChange={(event) => {
                            setSelectedUser({
                              ...selectedUser,
                              vista: event.target.value,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Programado"
                          required
                          
                          onChange={(event) => {
                            setSelectedUser({
                              ...selectedUser,
                              programado: event.target.value,
                            })
                          }}
                        />
                      </div>

                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Vacacional"
                          required
                          onChange={(event) => {
                            setSelectedUser({
                              ...selectedUser,
                              vacacional: event.target.value,
                            })
                          }}
                        />
                      </div>

                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Previo vivienda"
                          required
                          onChange={(event) => {
                            setSelectedUser({
                              ...selectedUser,
                              previo_vivienda: event.target.value,
                            })
                          }}
                        />
                      </div>
                     
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal4}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-primary text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button onClick={updateRecord} className="relative left-[42%] mt-4 px-5 py-2 bg-primary text-white rounded">
                      Agregar
                    </button>
                  </div>
                  
                </div>
              </div>
            )}

            {isOpen5 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
              <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
              <form
                              className="space-y-0"
                              action="#"
                              method="POST"
                            >
                <h2 className="text-2xl font-bold mb-4 relative text-center">
                  Voluntario
                </h2>
                <p className="text-center">
                  Ingresa el Numero de Documento para seleccionar al asociado
                </p>
                <div className="py-5">
                  <input
                    className="bg-slate-50 w-[400px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                    type="text"
                    placeholder="Numero De Documento"
                    id="numeroDocumento"
                    value={DocumentoBli}
                    required
                    onChange={(event) => {
                      setDocumentoBli(event.target.value);
                    }}
                  />
                </div>
                  <div>
                    <button
                      onClick={closeModal5}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-primary text-white rounded"
                    >
                      Cerrar
                    </button>
                    <Button className="relative left-[42%] mt-4 px-5 py-2 bg-primary text-white rounded"
                    onClick={addvolu}>
                      Agregar
                    </Button>
                  </div>
                  </form>
                </div>
              </div>
            )}
            {isOpen6 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Agregar ahorro obligatorio
                  </h2>
                  <p className="text-center">
                  Ingresa los valores requeridos para mostrar el estados de cuenta 
                  </p>
                  <p className="text-center ">
                  Aviso: Para mermar valores al saldo añada un signo "-" antes de la cantidad deseada.
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-0"
                          type="number"
                          placeholder="Saldo Ahorro ordinario"
                          required
                          onChange={(event) => {
                            setSelectedUser2({
                              ...selectedUser2,
                              ahorro_ordinario: event.target.value,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-0"
                          type="number"
                          placeholder="Saldo Permanente"
                          required
                          onChange={(event) => {
                            setSelectedUser2({
                              ...selectedUser2,
                              ahorro_permanente: event.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal6}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-primary text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button onClick={updateOblig} className="relative left-[42%] mt-4 px-5 py-2 bg-primary text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isOpen7 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                <form
                                className="space-y-0"
                                action="#"
                                method="POST"
                              >
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Aqui puedes agregar un asociado al beneficio
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  
                  <div>
                    <button
                      onClick={closeModal7}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-primary text-white rounded"
                    >
                      Cerrar
                    </button>
                    <Button className="relative left-[42%] mt-4 px-5 py-2 bg-primary text-white rounded"
                    onClick={add}>
                      Agregar
                    </Button>
                  </div>
                  </form>
                </div>
              </div>
            )}
            {isOpen8 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                   Agregar Ahorro Credito
                  </h2>
                  <p className="text-center">
                  Ingresa los valores requeridos para mostrar el estados de cuenta
                  </p>
                  <p className="text-center ">
                  Aviso: Para mermar valores al saldo añada un signo "-" antes de la cantidad deseada.
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Rotativo"
                          required
                          onChange={(event) => {
                            setSelectedUser3({
                              ...selectedUser3,
                              rotativo: event.target.value
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo SEC"
                          required
                          onChange={(event) => {
                            setSelectedUser3({
                              ...selectedUser3,
                              SEC: event.target.value,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-slate-50 w-[215px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Novedades varias"
                          required
                          onChange={(event) => {
                            setSelectedUser3({
                              ...selectedUser3,
                              novedades_varias: event.target.value,
                            })
                          }}
                        />
                      </div>
                      <div>
                        <input
                          className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-2"
                          type="number"
                          placeholder="Saldo Compra cartera"
                          required
                          onChange={(event) => {
                            setSelectedUser3({
                              ...selectedUser3,
                              compra_cartera: event.target.value,
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal8}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-primary text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button onClick={updateCredi} className="relative left-[42%] mt-4 px-5 py-2 bg-primary text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isOpen9 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
              <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
              <form
                              className="space-y-0"
                              action="#"
                              method="POST"
                            >
                <h2 className="text-2xl font-bold mb-4 relative text-center">
                 Agrega un asociado al ahorro credito
                </h2>
                <p className="text-center">
                  Ingresa el Numero de Documento para seleccionar al asociado
                </p>
                <div className="py-5">
                  <input
                    className="bg-slate-50 w-[400px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                    type="text"
                    placeholder="Numero De Documento"
                    id="numeroDocumento"
                    value={DocumentoCredi}
                    required
                    onChange={(event) => {
                      setDocumentoCredi(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    onClick={closeModal9}
                    className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                  >
                    Cerrar
                  </button>
                  <Button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded"
                  onClick={addcredi}>
                    Agregar
                  </Button>
                </div>
                </form>
              </div>
            </div>
            )}
             {isOpen10 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
              <div className="bg-white w-3/4 p-6 max-w-sm rounded shadow-lg  mx-auto relative">
              <form
                              className="space-y-0"
                              action="#"
                              method="POST"
                            >
                <h2 className="text-2xl font-bold mb-4 relative text-center">
                 Aqui puede agregar al asociado dependiendo del tipo bono
                </h2>
                <p className="text-center">
                  Ingresa el Numero de Documento
                </p>
                <div className="py-5 text-center">
                  <input
                    className="bg-slate-50 max-w-xs py-4 px-5 relative shadow-lg border-2 shadow-blue-500/40 rounded-lg top-4"
                    type="text"
                    placeholder="Numero De Documento"
                    id="numeroDocumento"
                    value={DocumentoBene}
                    required
                    onChange={(event) => {
                      setDocumento(event.target.value);
                    }}
                  />
                </div>

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

                <div className="py-5 px-7 flex text-center flexs">
                <div className="px-4">
                  <button className="mt-4 px-5 py-2 bg-Third text-white rounded"
                  onClick={addbeneficio}>
                    Agregar
                  </button>
                  </div>
                  <div className="px-0">
                  <button
                    onClick={closeModal10}
                    className="mt-4  px-5 py-2 bg-Third text-white rounded"
                  >
                    Cerrar
                  </button>

                  </div>
                 
                </div>
                </form>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beneficios;