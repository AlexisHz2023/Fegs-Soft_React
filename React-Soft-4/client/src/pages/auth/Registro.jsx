import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useAuth } from "./authcontext";



const Registro = () => {
  const { user } = useAuth();

  return (
    <div className='absolute'>
      <div className='flex items-center gap-4 z-10 fixed top-[6%] left-[55%] bg-gray-100 rounded-lg px-4 py-3'>
        <Dropdown placement="bottom-start">
          <DropdownTrigger className='bg-primary'>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                color: "primary",
                src: "",
              }}
              className="transition-transform "
              description={user.Correo}
              name={user.Nombre}
            />
          
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">Registrado Como</p>
              <p className="font-bold">@{user.Correo}</p>
            </DropdownItem>
            <DropdownItem key="settings">
              Mi Configuración
            </DropdownItem>
            <DropdownItem key="team_settings">Información</DropdownItem>
            <DropdownItem key="analytics">
              Análisis
            </DropdownItem>
            <DropdownItem key="system">Sistema</DropdownItem>
            <DropdownItem key="configurations">Saber Más</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Registro;
