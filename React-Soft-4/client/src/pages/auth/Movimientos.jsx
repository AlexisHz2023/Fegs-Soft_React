import React, { useState, useEffect,  useMemo } from "react";
import MenuAsesora from "./MenuAsesora";
import { Select, SelectItem } from "@nextui-org/react";
import { beneficios } from "./tiposbene";
import styled from "styled-components";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import Axios from "axios";
import { CiSearch } from "react-icons/ci";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
      className="top-5  relative"
    />
    <CiSearch className="w-10 h-10 text-gray-500 -top-[20px] ps-1 right-[0%] relative " />
    </div>
  </div>
);

const Movimientos = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [DocumentoBene, setDocumento] = useState("");
  const [records, setRecords] = useState([]);
  const [originalRecords, setOriginalRecords] = useState([]);
  const [rol, setRol] = useState("");
  const [filterText, setFilterText] = useState("");

  const addbeneficio = async (e) => {
    e.preventDefault();
  
    if (!DocumentoBene || !rol) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }
  
    setLoading(true); // Inicia la carga
  
    try {
      console.log(rol);
      // Realiza la solicitud GET utilizando async/await
      const response = await Axios.get("http://localhost:3001/usuario-datos", {
        params: {
          documento: DocumentoBene,
          beneficio: rol,
        },
      });
  
      console.log(response.data);
      setRecords(response.data || []);
      setOriginalRecords(response.data || []);
  
      Alerta.fire({
        title: <strong>Consulta Exitosa</strong>,
        html: <i>Datos obtenidos con éxito</i>,
        icon: "success",
        timer: 3000,
      });
  
      setIsOpen1(true); // Abre la tabla
  
    } catch (error) {
      // Maneja el error de la solicitud
      console.error("Error fetching data:", error);
  
      const errorMessage = error.response
        ? error.response.data
        : "Error desconocido";
  
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: errorMessage,
        footer: error.message === "Network Error" ? "Intente más tarde" : error.message,
      });
    } finally {
      // Detiene la carga sin importar el resultado
      setLoading(false);
    }
  };

  useEffect(() => {
    addbeneficio();
  }, []);

  const columnsVoluntarios = [
    { name: "Documento", selector: (row) => row.documento, sortable: true },
    { name: "Beneficio", selector: (row) => row.beneficios, sortable: true },
    { name: "Tipo_Monto", selector: (row) => row.tipo_monto, sortable: true },
    { name: "Monto", selector: (row) => row.monto, sortable: true },
    { name: "Fecha", selector: (row) => row.fecha, sortable: true },
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
    <div className="">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
        rel="stylesheet"
      />
      <MenuAsesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-4 absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">
        <div className="p-10 sm:ml-64">
          <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <div className="bg-white py-24 sm:py-32">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-Third sm:text-4xl">
                    Consulte los movimientos aquí.
                  </h2>
                </div>
                <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                  <div className="p-8 sm:p-10 lg:flex-auto text-center text-primary">
                    <FaMoneyBillTransfer className="w-28 h-28 relative -top-[3%] left-[45%] animate-pulse " />

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

                    <form className="space-y-0" action="#" method="POST">
                      <input
                        type="text"
                        placeholder="Ingrese el número de Documento"
                        value={DocumentoBene}
                        className="bg-gray-100 relative -top-5 z-20 text-gray-900 sm:text-sm rounded-lg block w-full p-4"
                        onChange={(event) => setDocumento(event.target.value)}
                      />
                    </form>

                    <div className="text-white">
                      <button
                        className="bg-Third p-2 rounded-lg hover:bg-primary"
                        onClick={addbeneficio}
                      >
                        Consultar
                      </button>
                    </div>

                    <div className="p-10">
                      <div className="w-94 py-20 bg-gray-200 rounded-lg relative text-center content-center">

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
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-10 flex items-center gap-x-4">
                      <h4 className="flex-none text-sm font-semibold leading-6 text-blue-300">
                        Consulta los Movimientos
                      </h4>
                      <div className="h-px flex-auto bg-gray-100"></div>
                    </div>
                    <ul
                      role="list"
                      className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                    ></ul>
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

export default Movimientos;
