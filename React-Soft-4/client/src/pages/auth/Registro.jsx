import React from 'react';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";




const Registro = () => {
  return (
    <div className='absolute'>
     <div className='flex items-center gap-4 z-10 fixed top-[6%] left-36'>
      <Dropdown placement="bottom-start">
        <DropdownTrigger className='bg-primary'>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              color: "primary",
              src: "./imagenes/perfil.PNG",
            }}
            className="transition-transform "
            description="alexisdurango721@gmail.com"
            name="Alexis Durango"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Registrado Como</p>
            <p className="font-bold">@AlexisDurango</p>
          </DropdownItem>
          <DropdownItem key="settings">
            Mi Configuracion
          </DropdownItem>
          <DropdownItem key="team_settings">Informacion</DropdownItem>
          <DropdownItem key="analytics">
            Analisis
          </DropdownItem>
          <DropdownItem key="system">Sistema</DropdownItem>
          <DropdownItem key="configurations">Saber Mas</DropdownItem>
         
          
        </DropdownMenu>
      </Dropdown>
     </div>
    
    </div>
  )
}

export default Registro