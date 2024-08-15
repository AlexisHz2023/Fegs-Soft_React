import MenuAsesora from './MenuAsesora'
import { CiEdit } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiReceipt } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { CiSaveDown2 } from "react-icons/ci";
import { CiSettings } from "react-icons/ci";

const Asesora = () => {
  return (
    <div className=''>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Briem+Hand:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <MenuAsesora />
      <div className="w-[95%] left-[2%] h-[90%] bg-white border-4  absolute z-20 top-[5%] rounded-lg overflow-auto scrollbar  scrollbar-thumb-rounded-full scrollbar-thumb-blue-300">

      <div className="p-10 sm:ml-64">
   <div className="p-8 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div className="grid grid-cols-3 gap-4 mb-4">
         <div className="flex items-center justify-center h-24  bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
            <span className='text-primary'>Hola!,</span> Bienvenido a la interfaz de <span className='text-Third'>Asesora</span><span className='text-primary'>.</span>
            
            </p>
         </div>
         <div className='py-0 left-24 relative '>
         <img className='w-[100%] h-auto' src="./imagenes/AsesoraInicio.svg" alt="" />
         
         </div>
               
   
      </div>   
   </div>

   <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
      <defs>
        <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
      </svg>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
    </svg>
  </div>
  <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
    <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div className="lg:pr-4">
        <div className="lg:max-w-lg">
          <p className="text-base font-semibold leading-7 text-primary">Asesora</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-Third sm:text-4xl">Ten en cuenta</h1>
          <p className="mt-6 text-xl leading-8 text-gray-700">Somos una entidad sin ánimo de lucro, que buscamos el bienestar social de nuestros asociados y sus familias satisfaciendo sus necesidades básicas a través del ahorro y el crédito.</p>
        </div>
      </div>
    </div>
    <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
    <div className="grid grid-cols-3 gap-4 place-items-center h-56 relative  shadow-inner border-2  rounded-lg ">
  <div><CiEdit className='w-10 h-10 text-primary' /></div>
  <div><CiUser className='w-10 h-10 text-primary' /></div>
  <div><CiReceipt className='w-10 h-10 text-primary' /></div>
  <div><CiMoneyBill className='w-10 h-10 text-primary' /></div>
  <div><CiSaveDown2 className='w-10 h-10 text-primary' /></div>
  <div><CiSettings className='w-10 h-10 text-primary' /></div>
</div>
    </div>
    <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
      <div class="lg:pr-4">
        <div class="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
          <p>Con un equipo humano calificado trabajamos en pro de mejorar la calidad de vida del asociado y su familia a través de:</p>
          <ul role="list" class="mt-8 space-y-8 text-gray-600">
            <li class="flex gap-x-3">
              <CiEdit class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z" clip-rule="evenodd" />
              </CiEdit>
              <span><strong class="font-semibold text-Third">SOLIDARIDAD</strong> Deseamos que nuestra colaboración inspire a la ayuda mutua entre las personas, sin esperar nada a cambio.</span>
            </li>
            <li class="flex gap-x-3">
              <CiUser class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </CiUser>
              <span><strong class="font-semibold text-Third">TRANSPARENCIA</strong> Somos claros en nuestras actuaciones, en la recolección de la información, y en la utilización y desarrollo de los recursos financieros.</span>
            </li>
            <li class="flex gap-x-3">
              <CiReceipt class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
              </CiReceipt>
              <span><strong class="font-semibold text-Third">HONESTIDAD</strong> Nos expresamos con coherencia y sinceridad al interior de nuestro Fondo y con los asociados.</span>
            </li>
            <li class="flex gap-x-3">
              <CiMoneyBill class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
              </CiMoneyBill>
              <span><strong class="font-semibold text-Third">LIDERAZGO</strong> En el desarrollo social de la región para construir un tejido social que facilite y acompañe los procesos de cambio.</span>
            </li>
            <li class="flex gap-x-3">
              <CiSaveDown2 class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
              </CiSaveDown2>
              <span><strong class="font-semibold text-Third">EQUIDAD</strong> En la actuación justa y ponderada frente a los asociados de nuestro fondo.</span>
            </li>
            <li class="flex gap-x-3">
              <CiSettings class="mt-1 h-5 w-5 flex-none text-primary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z" />
                <path fill-rule="evenodd" d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z" clip-rule="evenodd" />
              </CiSettings>
              <span><strong class="font-semibold text-Third">SERVICIO</strong> Brindamos orientación, asesoría y apoyo oportuno, confiable y con calidad al asociado y a sus familias, para garantizar su satisfacción.</span>
            </li>
          </ul>
          <h2 class="mt-16 text-2xl font-bold tracking-tight text-Third">Fomentamos la cultura del ahorro</h2>
          <p class="mt-6">Fomentar la cultura del ahorro es crucial para promover la estabilidad financiera y el bienestar a largo plazo. Desde la educación financiera temprana hasta la automatización de ahorros y la planificación a largo plazo, cada paso contribuye a cultivar hábitos financieros saludables. Al establecer metas claras, crear presupuestos y ofrecer incentivos, se motiva a las personas a tomar control de sus finanzas y a construir un futuro más seguro y próspero. Esta cultura no solo fortalece la capacidad de enfrentar imprevistos, sino que también facilita alcanzar objetivos financieros significativos a lo largo de la vida.</p>
        </div>
      </div>
    </div>
  </div>
</div>

   
        </div>
      </div>
    </div>


  
 
  )
}

export default Asesora
