
import { useEffect, useRef, useState } from 'react';
import { Gear, SignOut, List, } from "@phosphor-icons/react";
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';
import menuItemsData from './menuItemsData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Button } from '../ui/button';


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

  const size = 22;

  return (<div ref={menuRef} className='h-full items-center flex flex-col justify-between bg-[rgba(174,174,174,0.064)] backdrop-blur-lg border rounded border-[rgba(255,255,255,0.18)] shadow-2xl transition-all duration-300' style={{ width }}>
    <div className='flex flex-col w-[100%] pt-[15px]'>
      <List size={size} weight="fill" className={isOpen ? 'fill-[#03bb85] cursor-pointer w-auto' : ' w-auto cursor-pointer'} onClick={() => setIsOpen(!isOpen)} />
    </div>
    <div className='flex items-center flex-col w-[100%]'>
      {menuItemsData.map((item) => {
        return (
          <div className='w-[100%] flex-row'>
            <Link to={item.link} key={item.id}>
              <button className='w-[100%]'>
                <div className='flex justify-between items-center transition ease-linear '>
                  <div />
                  <div className='flex'>
                    <item.icon size={size} weight="fill" style={pathname === item.link ? {
                      fill: '#03bb85',
                      filter: "drop-shadow(0 0 10px #03bb85)",
                      transition: "ease-in-out 0.5s",
                    } : {}} className='w-[30px]' />
                    {isOpen &&
                      <div style={pathname === item.link ? {
                        color: '#03bb85',
                        filter: "drop-shadow(0 0 10px #03bb85)",
                        opacity: isOpen ? 1 : 0,
                        transition: "ease-in-out 0.5s",
                        overflow: "hidden",
                        scale: isOpen ? 1 : 0,
                      } : {}} className='w-[90px] text-left text-clip'>
                        {item.texto}
                      </div>}
                  </div>
                  <div className='w-[5px] h-[40px]' style={pathname === item.link ? {
                    backgroundColor: '#03bb85',
                    transition: "ease-in-out 0.5s",
                    filter: "drop-shadow(0 0 10px #03bb85)"
                  } : {}} />
                </div>
              </button>
            </Link>
          </div>
        )
      })}
    </div>
    <div className='flex flex-col w-[100%]'>
      <Link to="/configuracoes">
        <button className='w-[100%] '>
          <div className='flex justify-between items-center transition ease-linear '>
            <div />
            <div className='flex '>
              <Gear size={size} weight="fill" style={pathname === '/configuracoes' ? {
                fill: '#03bb85',
                filter: "drop-shadow(0 0 10px #03bb85)",
                transition: "ease-in-out 0.5s",
              } : {}} className='flex flex-col w-[30px]' />
              {isOpen &&
                <div style={pathname === '/configuracoes' ? {
                  color: '#03bb85',
                  filter: "drop-shadow(0 0 10px #03bb85)",
                  transition: "ease-in-out 0.5s",
                } : {}} className='w-[90px] text-left text-clip'>
                  Ajustes
                </div>}
            </div>
            <div className='w-[5px] h-[40px]' style={pathname === '/configuracoes' ? {
              backgroundColor: '#03bb85',
              transition: "ease-in-out 0.5s",
              filter: "drop-shadow(0 0 10px #03bb85)"
            } : {}} />
          </div>
        </button>
      </Link>
      <AlertDialog>
        <AlertDialogTrigger>
            <button className='w-[100%]' >
              <div className='w-[100%] p-2 justify-center items-center flex flex-row'>
                <SignOut size={size} weight="fill" className='flex flex-col w-[30px]' />
                {isOpen &&
                  <div className='w-[90px] text-left text-clip'>
                    Sair
                  </div>}
              </div>
            </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sair</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja realmente sair?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction><Link to="/"><Button onClick={() => handleSaveUserLogged()}>Sair</Button></Link></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  </div>)
};

export default MenuSlider;
