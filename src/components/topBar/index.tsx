import React, { useState } from 'react';
import { ChatText, EnvelopeSimple, MagnifyingGlass } from "@phosphor-icons/react";
import './style.css';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const TopBar = () => {

    const [isClicked, setIsClicked] = useState(false);

    const onClickPerfil = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div className="topbar">
            <div></div>
            <div className="flex items-center content-center w-[30%] flex-rows border rounded-md">
                <Input
                    type="text"
                    placeholder="Pesquisar..."
                    className="border-none focus-visible:ring-0"
                />
                <MagnifyingGlass className="icon-search" />
            </div>
            <div className='topbar-rigth'>
                <div className='icones-rigth'>
                    <EnvelopeSimple size={26} />
                    <ChatText size={26} />
                </div>
                <Popover>
                    <PopoverTrigger>
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default TopBar;


