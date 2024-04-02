
import { useEffect, useRef, useState } from 'react';
import { Gear, SignOut, List, } from "@phosphor-icons/react";
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import menuItemsData from './menuItemsData';


const MenuSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { handleSaveUserLogged } = useAuth();

  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, []);

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  const width = isOpen ? '200px' : '60px';

  return (<div ref={menuRef} className='h-full items-center flex flex-col justify-between p-5 bg-[rgba(174,174,174,0.064)] backdrop-blur-lg border rounded border-[rgba(255,255,255,0.18)] shadow-2xl transition-all duration-300' style={{ width }}>
    <div className='w-[100%]'>
      <List size="20" weight="fill" className={isOpen ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} onClick={() => setIsOpen(!isOpen)} />
    </div>
    <div className='w-[100%] flex flex-col gap-5'>
      {menuItemsData.map((item) => {
        return (
          <Link to={item.link} key={item.id}>
            <item.icon size="20" weight="fill" className={pathname === item.link ? 'fill-[#03bb85]  w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} />
          </Link>
        )
      })}
    </div>
    <div className='w-[100%] flex flex-col gap-5'>
      <Link to="/configuracoes">
        <Gear size="20" weight="fill" to={"/configuracoes"} className={pathname === '/configuracoes' ? 'fill-[#03bb85] w-[100%] cursor-pointer' : 'w-[100%] cursor-pointer'} />
      </Link>
      <SignOut size="20" weight="fill" className='w-[100%] cursor-pointer' onClick={() => handleSaveUserLogged()} />
    </div>
  </div>)
};

export default MenuSlider;
