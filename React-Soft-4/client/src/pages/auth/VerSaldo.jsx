import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "./authcontext";
import { useNavigate } from "react-router-dom";
import { SlPrinter } from "react-icons/sl";
import { TbDoorExit } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import DataTable from "react-data-table-component";

const VerSaldo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [valoresList, setValores] = useState([]);
  const [voluList, setVolu] = useState([]);
  const [crediList, setCredi] = useState([]);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      getObligatorios(user.id);
      getVoluntarios(user.id);
      getCreditos(user.id);
    }
  }, [user]);

  const [obligatorios, setObligatorios] = useState([]);
const [voluntarios, setVoluntarios] = useState([]);
const [creditos, setCreditos] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const obligatoriosResponse = await Axios.get(`http://localhost:3001/usuario-ahorros-obligatorios/${user.id}`);
      console.log("Obligatorios Response", obligatoriosResponse); // Verifica la respuesta completa
      setObligatorios(obligatoriosResponse.data || []);

      const voluntariosResponse = await Axios.get(`http://localhost:3001/usuario-ahorros-voluntarios/${user.id}`);
      console.log("Voluntarios Response", voluntariosResponse); // Verifica la respuesta completa
      setVoluntarios(voluntariosResponse.data || []);

      const creditosResponse = await Axios.get(`http://localhost:3001/usuario-creditos/${user.id}`);
      console.log("Creditos Response", creditosResponse); // Verifica la respuesta completa
      setCreditos(creditosResponse.data || []);

    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  };

  if (user && user.id) {
    fetchData();
  }
}, [user]);


  const getObligatorios = () => {
    Axios.get(`http://localhost:3001/obligatorios/${user.id}`)
      .then((response) => {
        setValores(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener valores:", error);
      });
  };

  const getVoluntarios = () => {
    Axios.get(`http://localhost:3001/voluntarios/${user.id}`)
      .then((response) => {
        setVolu(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener valores:", error);
      });
  };

  const getCreditos = () => {
    Axios.get(`http://localhost:3001/creditos/${user.id}`)
      .then((response) => {
        setCredi(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener valores:", error);
      });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
  });

  const columns = [
    {
      name: "Monto",
      selector: (row) => row.monto,
    },
    {
      name: "Tipo_Monto",
      selector: (row) => row.tipo_monto,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
  ];


  const columns2 = [
    {
      name: "Monto",
      selector: (row) => row.monto,
    },
    {
      name: "Tipo_Monto",
      selector: (row) => row.tipo_monto,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
  ];


  const columns3 = [
    {
      name: "Monto",
      selector: (row) => row.monto,
    },
    {
      name: "Tipo_Monto",
      selector: (row) => row.tipo_monto,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
  ];


  return (
    <div className="absoluted">
      {/* ... enlaces de estilos omitidos para brevedad ... */}
      <div
        ref={componentRef}
        className="bg-white w-[95%] z-20 h-[95%] border-4 border-gray-300 right-[2%] top-5 rounded-lg absolute overflow-hidden overflow-x-hidden print:hidden-scroll"
      >
        <h1 className="relative text-center text-4xl top-5">
          Estado De Cuenta
        </h1>
        <h2 className="relative text-center text-2xl top-7">
          CEDULA: {user.Documento}
        </h2>
        <h2 className="relative text-center text-2xl top-10">
          NOMBRE: {user.Nombre}
        </h2>
        <img
          className="relative w-36 left-8 -top-16 max-w-full h-auto"
          src="./imagenes/Logo2.PNG"
          alt=""
        />

        {/* Primera tabla */}
        <table
          id="tabla"
          className="border-separate border-spacing-2 border border-gary-300 absolute left-[20%] top-[24%] rounded-lg w-[30%]"
        >
          <thead>
            <tr>
              <th className="border-none rounded border-slate-600 bg-orange-300 text-black">
                Fecha
              </th>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Créditos
              </th>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {crediList.map((val) => (
              <React.Fragment key={val.idcreditos}>
                <tr>
                  <td className="border-none text-center border-slate-700">
                    11/08/2023
                  </td>
                  <td className="border-none text-center border-slate-700">
                    Rotativo
                  </td>
                  <td className="border-none text-center border-slate-700">
                    {val.rotativo}
                  </td>
                </tr>
                <tr>
                  <td className="border-none text-center border-slate-700">
                    11/08/2023
                  </td>
                  <td className="border-none text-center border-slate-700">
                    SEC
                  </td>
                  <td className="border-none text-center border-slate-700">
                    {val.SEC}
                  </td>
                </tr>
                <tr>
                  <td className="border-none text-center border-slate-700">
                    12/08/2023
                  </td>
                  <td className="border-none text-center border-slate-700">
                    Novedades varias
                  </td>
                  <td className="border-none text-center border-slate-700">
                    {val.novedades_varias}
                  </td>
                </tr>
                <tr>
                  <td className="border-none text-center border-slate-700">
                    12/08/2023
                  </td>
                  <td className="border-none text-center border-slate-700">
                    Compra de cartera
                  </td>
                  <td className="border-none text-center border-slate-700">
                    {val.compra_cartera}
                  </td>
                </tr>
                <tr>
                  <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
                    12/08/2023
                  </td>
                  <td className="border-none rounded text-center border-slate-700 bg-blue-300 text-black">
                    Capacidad crediticia
                  </td>
                  <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Segunda tabla */}
        <table className="border-separate border-spacing-2 border border-gary-300 absolute left-[55%] top-[25%] w-[30%] rounded-lg">
          <thead>
            <tr>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Fecha
              </th>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Ahorros Voluntarios
              </th>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {voluList.map((val) => (
              <React.Fragment key={val.idahorros}>
                <tr>
                  <td className="border border-none text-center border-slate-700">
                    10/08/2023
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    A la vista
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    {val.vista}
                  </td>
                </tr>
                <tr>
                  <td className="border border-none text-center border-slate-700">
                    11/08/2023
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    Programado
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    {val.programado}
                  </td>
                </tr>
                <tr>
                  <td className="border border-none text-center border-slate-700">
                    12/08/2023
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    Vacacional
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    {val.vacacional}
                  </td>
                </tr>
                <tr>
                  <td className="border border-none text-center border-slate-700">
                    12/08/2023
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    Previo de vivienda
                  </td>
                  <td className="border border-none text-center border-slate-700">
                    {val.previo_vivienda}
                  </td>
                </tr>
                <tr>
                  <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
                    12/08/2023
                  </td>
                  <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
                    Total
                  </td>
                  <td className="border-none text-center rounded border-slate-700 bg-blue-300 text-black">
                    {val.vista +
                      val.programado +
                      val.vacacional +
                      val.previo_vivienda}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Tercera tabla */}
        <table className="border-separate border-spacing-2 border border-gary-300 left-[35%] top-[65%] absolute rounded-lg w-[30%]">
          <thead>
            <tr>
              <th className="border-none border-slate-600 bg-orange-300 text-black rounded">
                Fecha
              </th>
              <th className="border-none text-center border-slate-600 bg-orange-300 text-black rounded">
                Ahorros Obligatorios
              </th>
              <th className="border-none text-center border-slate-600 bg-orange-300 text-black rounded">
                Monto
              </th>
            </tr>
          </thead>
          <tbody>
            {valoresList.map((val) => (
              <tr key={val.idahorros}>
                <td className="border-none text-center border-slate-700">
                  11/08/2023
                </td>
                <td className="border-none text-center border-slate-700">
                  Fondo Social
                </td>
                <td className="border-none text-center border-slate-700">
                  {val.fondo_social}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botones para Imprimir y Volver, que solo se muestran cuando no se está imprimiendo */}
        {!isPrinting && (
          <>
            <div className="no-print flex bg-white border-2 border-primary w-fit top-[60%] left-10 relative px-1.25 py-1.25 shadow-box-up rounded-2xl dark:bg-box-dark dark:shadow-box-dark-out">
              <div className="dark:shadow-buttons-box-dark rounded-2xl w-full px-1.5 py-1.5 md:px-3 md:py-3">
                <Button
                  onPress={onOpen}
                  title="Go to the home page"
                  className="no-print text-primary hover:text-gray-300 text-xl border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary "
                >
                  <FaMoneyBillTransfer />
                  Movimientos
                </Button>
                <button
                  onClick={handlePrint}
                  className="no-print text-primary hover:text-gray-300 text-xl border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary "
                >
                  <SlPrinter />
                  Imprimir
                </button>
                <Link to="/">
                  <button
                    onClick={handleLogout}
                    title="Go to about me page"
                    className="no-print text-primary hover:text-gray-300 text-xl border-2 inline-flex items-center mr-4 last-of-type:mr-0 p-2.5 border-transparent bg-light-secondary "
                  >
                    <TbDoorExit />
                    Salir
                  </button>
                </Link>
              </div>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent className="">
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Estos son tus movimientos
                    </ModalHeader>
                    <ModalBody>
                      <DataTable
                        title="Ahorros Voluntarios"
                        columns={columns}
                        data={obligatorios}
                      />

                      <DataTable
                        title="Ahorros Obligatorios"
                        columns={columns2}
                        data={voluntarios}
                      />

                      <DataTable
                        title="Creditos"
                        columns={columns3}
                        data={creditos}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onPress={onClose}>
                        Salir
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
};

export default VerSaldo;
