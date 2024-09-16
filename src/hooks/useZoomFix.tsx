import { useEffect } from 'react';

const useZoomFix = () => {
    useEffect(() => {
        const detectZoomLevel = () => {
            const zoomLevel = Math.round(window.devicePixelRatio * 100);
            const scaleFactor = 100 / zoomLevel;

            // Aplica a escala ao body
            document.body.style.transform = `scale(${scaleFactor})`;
            document.body.style.transformOrigin = '0 0';
            document.body.style.width = `${100 / scaleFactor}vw`;
            document.body.style.height = `${100 / scaleFactor}vh`;
            document.body.style.overflow = 'hidden';

        };

        window.addEventListener('resize', detectZoomLevel);
        detectZoomLevel();

        return () => {
            window.removeEventListener('resize', detectZoomLevel);
        };
    }, []);
};

export default useZoomFix;
