import React, { useState } from 'react';


const Ejemplo = () => {

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  // Funciones para abrir y cerrar los modales
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);

  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);

  const openModal3 = () => setIsOpen3(true);
  const closeModal3 = () => setIsOpen3(false);

  
  return (
    <div className='absolute'>
      <div className="flex flex-col items-center space-y-4 p-6">
      {/* Botones para abrir modales */}
      <button onClick={openModal1} className="px-4 py-2 bg-blue-600 text-white rounded">
        Abrir Modal 1
      </button>
      <button onClick={openModal2} className="px-4 py-2 bg-green-600 text-white rounded">
        Abrir Modal 2
      </button>
      <button onClick={openModal3} className="px-4 py-2 bg-red-600 text-white rounded">
        Abrir Modal 3
      </button>

      {/* Modal 1 */}
      {isOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 h-[105%] -top-5 z-10">
          <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Modal 1</h2>
            <p>Contenido del Modal 1</p>
            <button onClick={closeModal1} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal 2 */}
      {isOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Modal 2</h2>
            <p>Contenido del Modal 2</p>
            <button onClick={closeModal2} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal 3 */}
      {isOpen3 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Modal 3</h2>
            <p>Contenido del Modal 3</p>
            <button onClick={closeModal3} className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
     


    </div>
  )
}

export default Ejemplo
