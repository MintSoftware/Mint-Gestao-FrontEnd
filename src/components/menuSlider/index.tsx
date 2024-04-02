
import React, { useEffect, useRef, useState } from 'react';
import { House, Barbell, Gear, SignOut, CurrencyCircleDollar, List, Lockers, Student, Briefcase, Calendar, Users, Warehouse, MapPinLine, MapPin, PiggyBank } from "@phosphor-icons/react";
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';


const MenuSlider = () => {
  const [isSelected, setIsSelected] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    verificarRota();
  }, []);

  const verificarRota = () => {
    const url = window.location.pathname;
    if (url === '/') {
      setIsSelected(1);
    } else if (url === '/clientes') {
      setIsSelected(3);
    } else if (url === '/calendario') {
      setIsSelected(4);
    } else if (url === '/locais') {
      setIsSelected(5);
    } else if (url === '/financeiro') {
      setIsSelected(6);
    } else if (url === '/configuracoes') {
      setIsSelected(7);
    }
  }

  const { handleSaveUserLogged } = useAuth();

  const Sair = () => {
    handleSaveUserLogged();
  }

  const handleIconClick = (id: number) => {
    setIsSelected(id);
  }

  const width = isOpen ? '200px' : '60px';

  return (
    <Link to={"/"}>
    <div className='h-full items-center flex flex-col justify-between p-5 bg-[rgba(174,174,174,0.064)] backdrop-blur-lg border border-[rgba(255,255,255,0.18)] shadow-2xl transition-all duration-300' style={{ width }}>
      <div className='w-[100%]'>
        <List size="20" weight="fill" className={isOpen ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className='w-[100%] flex flex-col gap-5'>
        <House size="20" weight="fill" className={isSelected === 1 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => { handleIconClick(1); setLink("/home"); }} />
        <Users size="20" to={"/clientes"} weight="fill" className={isSelected === 2 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => {handleIconClick(2); setLink("/clientes"); }} />
        <Calendar size="20" weight="fill" className={isSelected === 4 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => {handleIconClick(4); setLink("/calendario"); }} />
        <MapPin size="20" to={"/locais"} weight="fill" className={isSelected === 3 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => {handleIconClick(5); setLink("/locais"); }} />
        <CurrencyCircleDollar to={"/financeiro"} size="20" weight="fill" className={isSelected === 4 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => {handleIconClick(6); setLink("/financeiro"); }} />
      </div>
      <div className='w-[100%] flex flex-col gap-5'>
        <Gear size="20" weight="fill" to={"/configuracoes"} className={isSelected === 7 ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => {handleIconClick(7); setLink("/configuracoes"); }} />
        <SignOut size="20" weight="fill" className='w-[100%] cursor-pointer' onClick={Sair} />
      </div>
    </div>
    </Link >
  );
};

export default MenuSlider;
