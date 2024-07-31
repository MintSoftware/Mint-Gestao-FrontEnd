import { useEffect, useState } from 'react';
import './BackgroundFlutuante.css';

interface Bolha {
    id: number;
    tamanho: number;
    top: number;
    left: number;
}

interface BackgroundFlutuanteProps {
    cor? : string;
}
const BackgroundFlutuante = ({ cor = "#88B702" }: BackgroundFlutuanteProps) => {
    const [bolhas, setBolhas] = useState<Bolha[]>([]);

    useEffect(() => {
        const novasBolhas = Array.from({ length: 2 }, (_, index) => ({
            id: index,
            tamanho: Math.random() * 1.25 + 350,
            top: Math.random() * (window.innerHeight - 300), // Ajuste para não ultrapassar a borda inferior
            left: Math.random() * (window.innerWidth - 300), // Ajuste para não ultrapassar a borda direita
        }));

        setBolhas(novasBolhas);
        

        const handleResize = () => {
            setBolhas((prevBolhas) =>
                prevBolhas.map((bolha) => ({
                    ...bolha,
                    top: Math.random() * (window.innerHeight - bolha.tamanho),
                    left: Math.random() * (window.innerWidth - bolha.tamanho),
                }))
            );
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        bolhas.map((bolha) => (
            <div
                key={bolha.id}
                className="bolha"
                style={{
                    position: 'absolute',
                    width: bolha.tamanho,
                    height: bolha.tamanho,
                    top: bolha.top,
                    left: bolha.left,
                    background: cor,
                    boxShadow: `0 0 10px ${cor}, 0 0 20px ${cor}, 0 0 30px ${cor}`,
                    overflow: 'hidden',
                    zIndex: -1,
                }}
            ></div>
        ))
    );
};

export default BackgroundFlutuante;