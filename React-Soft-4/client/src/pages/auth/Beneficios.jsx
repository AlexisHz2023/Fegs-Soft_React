import React, { useState, useEffect, useMemo } from "react";
import MenuAsesora from "./MenuAsesora";
import DataTable from "react-data-table-component";
import Axios from "axios";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useDisclosure } from "@nextui-org/react";

const TextField = styled.input`
  height: 44px;
  width: 260px;
  border-radius: 10rem;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 40px;
`;

const FilterComponent = ({ filterText, onFilter }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <TextField
      id="search"
      type="text"
      placeholder="Ingresa el Dato"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
      className="-top-5 relative"
    />
    <CiSearch className="w-9 h-9 text-gray-500 -top-[20px] ps-1 right-[30%] relative" />
  </div>
);

const Beneficios = () => {
  const [Vista, setVista] = useState("")
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
  const [records, setRecords] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [originalRecords, setOriginalRecords] = useState([]);
  const [loading, setLoading] = useState(true);

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
    { name: "ID", selector: (row) => row.idahorros, sortable: true },
    { name: "Vista", selector: (row) => row.vista, sortable: true },
    { name: "Programado", selector: (row) => row.programado, sortable: true },
    { name: "Documento", selector: (row) => row.vacacional, sortable: true },
    {
      name: "Previo vivienda",
      selector: (row) => row.previo_vivienda,
      sortable: true,
    },
    {
      name: "Seguimiento",
      selector: (row) => row.seg_ahorro_voluntario,
      sortable: true,
    },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => openModal4(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
    {
      name: "agregar",
      cell: (row) => (
        <button
          onClick={() => openModal5(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Nuevo
        </button>
      ),
    },
  ];

  const columnsObligatorios = [
    { name: "ID", selector: (row) => row.idobligatorio, sortable: true },
    { name: "Usuario", selector: (row) => row.usuariobli, sortable: true },
    {
      name: "Ahorro Ordinario",
      selector: (row) => row.ahorro_ordinario,
      sortable: true,
    },
    {
      name: "Ahorro Obligatorio",
      selector: (row) => row.seg_ahorro_obligatorio,
      sortable: true,
    },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => openModal6(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
    {
      name: "agregar",
      cell: (row) => (
        <button
          onClick={() => openModal7(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Nuevo
        </button>
      ),
    },
  ];

  const columnsCreditos = [
    { name: "ID", selector: (row) => row.idcreditos, sortable: true },
    { name: "Usuario", selector: (row) => row.usuariocredi, sortable: true },
    { name: "SEC", selector: (row) => row.SEC, sortable: true },
    {
      name: "Novedades Varias",
      selector: (row) => row.novedades_varias,
      sortable: true,
    },
    {
      name: "Compra Cartera",
      selector: (row) => row.compra_cartera,
      sortable: true,
    },
    {
      name: "Seguimiento Crédito",
      selector: (row) => row.seg_credito,
      sortable: true,
    },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() => openModal8(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Editar
        </button>
      ),
    },
    {
      name: "agregar",
      cell: (row) => (
        <button
          onClick={() => openModal9(row)}
          className="bg-blue-500 text-white px-2 py-1 rounded"
        >
          Nuevo
        </button>
      ),
    },
  ];

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
            <div className="flex flex-wrap justify-center gap-4 p-6">
              <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M18.799 7.101L12.029.63a2.122 2.122 0 0 0-2.876.001L2.384 7.1a1.01 1.01 0 0 0 1.346 1.505l.804-.72v7.93a2.146 2.146 0 0 0 2.145 2.145h6.6a2.146 2.146 0 0 0 2.145-2.145V7.884l.807.723a1.01 1.01 0 1 0 1.346-1.505zm-8.896-5.59a.101.101 0 0 1 .136 0l6.371 5.558H3.53l6.373-5.558zM6.503 8.862H12.001v7.476H5.859a.101.101 0 0 1-.101-.101V8.862h.745zm11.134 0H13.5v7.376a.101.101 0 0 1-.101.101H12.0V8.862h5.637z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-white pt-3">
                  Ahorro Voluntario
                </h2>
                <div className="text-sm text-gray-300">
                  Planificación a corto plazo
                </div>
                <button
                  onClick={() => {
                    fetchData();
                    setIsOpen1(!isOpen1);
                    setIsOpen2(false);
                    setIsOpen3(false);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Ver más
                </button>
              </div>
              <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M16.06 1.22L14.06 0a3.246 3.246 0 0 0-4.12 0L5.94 1.22a3.246 3.246 0 0 0-1.94 3V20c0 1.11.89 2 2 2h10a2 2 0 0 0 2-2V4.22a3.246 3.246 0 0 0-1.94-3zM9 22v-8h6v8H9zm9-2c0 .55-.45 1-1 1H9v-8h6v8h1c.55 0 1-.45 1-1V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22c0-.87-.51-1.64-1.28-1.96L12 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10V4.22a1.996 1.996 0 0 0-1.34-1.91L14 1.5V1c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v.5L7.34 2.31c-.63.28-1.34.74-1.34 1.91V20h10z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-white pt-3">
                  Ahorro Obligatorio
                </h2>
                <div className="text-sm text-gray-300">
                  Planificación a largo plazo
                </div>
                <button
                  onClick={() => {
                    fetchObligatorios();
                    setIsOpen1(false);
                    setIsOpen2(!isOpen2);
                    setIsOpen3(false);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Ver más
                </button>
              </div>
              <div className="flex-none m-4 bg-gray-700 max-w-[300px] rounded-xl hover:bg-gray-900 hover:scale-110 duration-700 p-5">
                <figure className="w-10 h-10 p-2 bg-blue-800 rounded-md">
                  <svg width="24" height="24" fill="#FFFFFF">
                    <path d="M10.5 16.5v-3H7v3H4.5v-3H3v3c0 .825.675 1.5 1.5 1.5H4.5a1.5 1.5 0 0 0 1.5-1.5v-3h3zM20 7.5H10.5V9H20zM10.5 12H20v1.5H10.5zM16 0H8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16zM8 1.5h8a6.506 6.506 0 0 1 6.5 6.5 6.506 6.506 0 0 1-6.5 6.5H8A6.506 6.506 0 0 1 1.5 8 6.506 6.506 0 0 1 8 1.5z" />
                  </svg>
                </figure>
                <h2 className="text-base font-medium text-white pt-3">
                  Créditos
                </h2>
                <div className="text-sm text-gray-300">
                  Créditos disponibles
                </div>
                <button
                  onClick={() => {
                    fetchCreditos();
                    setIsOpen1(false);
                    setIsOpen2(false);
                    setIsOpen3(!isOpen3);
                  }}
                  className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-lg"
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
                    Aqui puedes agregar al asociado
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">

                      <div className="flex-none">
                    <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      value={Vista}
                      placeholder="Numero De Documento"
                      required
                      onChange={(event) => {
                        setVista(event.target.vista)
                      }}
                    />
                    </div>
                     <div>
                    <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      required
                    />
                    </div>
                    
                    <div>
                    <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      required
                    />
                    </div>

                    <div>

                    <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      required
                    />
</div>
<div>
                    <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      required
                    />
                    </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal4}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isOpen5 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Aqui puedes agregar al asociado
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="py-5">
                    <input
                      className="bg-slate-50 w-[400px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    />
                  </div>
                  <div>
                    <button
                      onClick={closeModal5}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
             {isOpen6 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Credito Obligatorio
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">
                      <div> <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    /></div>
                      <div>
                      <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal6}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
             {isOpen7 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Obligatorio
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="py-5">
                    <input
                      className="bg-slate-50 w-[400px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    />
                  </div>
                  <div>
                    <button
                      onClick={closeModal7}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
             {isOpen8 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Ahorro Credito 
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="mx-auto">
                    <div className="flex flex-wrap justify-center gap-4 p-6 right-10 relative">
                      <div> <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    /></div>
                      <div>
                      <input
                      className="bg-slate-50 w-[200px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    />
                      </div>
                    
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={closeModal8}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )}
             {isOpen9 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-90 h-[82%] w-[76%] left-[19%] top-[12%] z-30 rounded-lg">
                <div className="bg-white w-3/4 p-6 rounded shadow-lg  mx-auto relative">
                  <h2 className="text-2xl font-bold mb-4 relative text-center">
                    Aqui puedes agregar al asociado Credito
                  </h2>
                  <p className="text-center">
                    Ingresa el Numero de Documento para seleccionar al asociado
                  </p>
                  <div className="py-5">
                    <input
                      className="bg-slate-50 w-[400px] h-[50px] left-[30%] shadow-lg border-2 shadow-blue-500/40 rounded-lg relative top-4"
                      type="number"
                      placeholder="Numero De Documento"
                      id="numeroDocumento"
                      name="numeroDocumento"
                      required
                    />
                  </div>
                  <div>
                    <button
                      onClick={closeModal9}
                      className="mt-4 left-[40%] relative px-5 py-2 bg-gray-600 text-white rounded"
                    >
                      Cerrar
                    </button>
                    <button className="relative left-[42%] mt-4 px-5 py-2 bg-gray-600 text-white rounded">
                      Agregar
                    </button>
                  </div>
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
