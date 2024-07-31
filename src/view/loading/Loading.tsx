import React from 'react';
import './Loading.css';

const LoadingScreen: React.FC = () => {

    return (
        <>
            <div className='aneis'>
                <div className='anel'></div>
                <div className='anel'></div>
                <div className='anel'></div>
            </div>
            <label style={{color: "white"}}className='loading'>Carregando...</label>
        </>
    );
};


export default LoadingScreen;