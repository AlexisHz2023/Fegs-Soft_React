import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imagen from '../../img/cafe.jpg';
import { useAuth } from '../autenticacion/AuthContext';
import AnadirProducto from '../AdminSupremo/AnadirProducto';
import Producto from './Producto';
import EditarProductoModal from '../AdminSupremo/EditarProductoModal';
import EliminarProducto from '../AdminSupremo/DesactivarProducto';
import PedidoModalMenu from './PedidoModalMenu';

export const Menu = () => {
    const { isLoggedIn, role } = useAuth();
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarPedidoModal, setMostrarPedidoModal] = useState(false);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/products');
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleEditarProducto = async () => {
        try {
            await axios.put(
                `http://localhost:3001/api/products/${productoSeleccionado.id_producto}`,
                productoSeleccionado
            );

            const response = await axios.get('http://localhost:3001/products');
            setProductos(response.data);

            setMostrarModal(false);
        } catch (error) {
            console.error('Error al editar el producto:', error);
        }
    };

    const handleAbrirPedidoModal = (producto) => {
        setProductoSeleccionado(producto);
        setMostrarPedidoModal(true);
    };

    return (
        <div className='content'>
            <div className="row">
                {isLoggedIn && (role === 2 || role === 3) && <AnadirProducto setProductos={setProductos} />}

                <div className="col-md">
                    <h4 className='cuerpo'>Comidas</h4>
                    <div className='container mt-4'>
                        {productos.map(producto => (
                            producto.categoria === 'Comida' && producto.estado !== 'inactivo' && (
                                <div key={producto.id_producto}>
                                    <Producto
                                        nombre={producto.nombre}
                                        descripcion={producto.descripcion}
                                        precio={producto.precio}
                                        imagenSrc={`data:image/jpeg;base64,${producto.imagenBase64}`}
                                        onClick={() => handleAbrirPedidoModal(producto)}
                                    />
                                    {isLoggedIn && role === 2 && role === 3  && (
                                        <div className="d-flex">
                                            <button
                                                className='btn btn-primary'
                                                onClick={() =>
                                                    handleAbrirPedidoModal(producto)
                                                }
                                            >
                                                Editar Producto
                                            </button>
                                            <EliminarProducto
                                                id_producto={producto.id_producto}
                                                setProductos={setProductos}
                                                onProductoEliminado={(id) => {
                                                    const updatedProductos = productos.filter(p => p.id_producto !== id);
                                                    setProductos(updatedProductos);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="col-md">
                    <h4 className='cuerpo'>Bebidas</h4>
                    <div className='container mt-4'>
                        {productos.map(producto => (
                            producto.categoria === 'Bebida' && producto.estado !== 'inactivo' && (
                                <div key={producto.id_producto}>
                                    <Producto
                                        nombre={producto.nombre}
                                        descripcion={producto.descripcion}
                                        precio={producto.precio}
                                        imagenSrc={imagen}
                                        onClick={() => handleAbrirPedidoModal(producto)}
                                    />
                                    {isLoggedIn && role === 2 && role === 3 && (
                                        <div className="d-flex">
                                            <button
                                                className='btn btn-primary'
                                                onClick={() => {
                                                    setProductoSeleccionado(producto);
                                                    setMostrarModal(true);
                                                }}
                                            >
                                                Editar Producto
                                            </button>
                                            <EliminarProducto
                                                id_producto={producto.id_producto}
                                                setProductos={setProductos}
                                                onProductoEliminado={(id) => {
                                                    const updatedProductos = productos.filter(p => p.id_producto !== id);
                                                    setProductos(updatedProductos);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>

            {mostrarModal && productoSeleccionado && (
                <EditarProductoModal
                    productoSeleccionado={productoSeleccionado}
                    mostrarModal={mostrarModal}
                    handleEditarProducto={handleEditarProducto}
                    setMostrarModal={setMostrarModal}
                    setProductoSeleccionado={setProductoSeleccionado}
                />
            )}

            {mostrarPedidoModal && productoSeleccionado && (
                <PedidoModalMenu
                    producto={productoSeleccionado}
                    mostrarModal={mostrarPedidoModal}
                    setMostrarModal={setMostrarPedidoModal}
                />
            )}
        </div>
    );
};

export default Menu;




// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// AAAAAAAAAAAAAAAAA


// ESTO ES APARTE



import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './autenticacion/AuthContext';
import palmeraIco from '../img/palmera.png';

export const BarraNavegacion = () => {

  const { isLoggedIn, logout, role, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const EstiloCuenta = {
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#f2eddb'
  }

  return (
    <>
      {/* aca esta la barra de menu, con la barra de busqueda, logo y menu del usuario */}

      <Navbar expand="lg" className="bg-Barra2" style={{ height: '9%' }}>
        <Container>
          <Navbar.Brand href="#">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={palmeraIco} height="50" style={{ width: '70px' }} alt="Palmera" />
              <p style={{ margin: 0, marginLeft: '10px', fontSize: '30px', fontWeight: 'bold' }} className='texto-titulo cuerpo'>Petitoya</p>
            </div>
          </Navbar.Brand>
          {isLoggedIn ? (
            <NavDropdown title={<span style={EstiloCuenta}>Bienvenido, {user.username}</span>} id="basic-nav-dropdown" className='text-white cuerpo'>
              <NavDropdown.Item href="#action/3.2">Configuración</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className='text-white cuerpo'>
              <Nav.Link as={Link} to="/registro" style={EstiloCuenta}>Registro</Nav.Link>
              <Nav.Link as={Link} to="/" style={EstiloCuenta}>Iniciar Sesión</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>

      {/* aca esta la barra de navegacion con las opciones inicio, menu, pedidos */}

      <Navbar expand="lg" className="bg-barra3 text-white cuerpo" data-bs-theme="light">
        <Container>
          <Nav.Link as={Link} to="">Inicio</Nav.Link>
          <Nav.Link as={Link} to="menu">Menú</Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={Link} to="pedidos">Pedidos</Nav.Link>
          )}
          {isLoggedIn && role === 2 && (
            <Nav.Link as={Link} to="/admin">Ruta Privada Admin</Nav.Link>
          )}
          {isLoggedIn && role === 3 && (
            <Nav.Link as={Link} to="/superusuario">Ruta Privada Superusuario</Nav.Link>
          )}
        </Container>
      </Navbar>

    </>
  )
}

