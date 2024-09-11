import Api from "@/infra/api";
import { useTemaContext } from "@/providers/TemaProvider";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useConfiguracaoController() {

    const colorPresets = [
        { name: "Indigo", primary: "#4f46e5", secondary: "#303030" },
        { name: "Rose", primary: "#e11d48", secondary: "#303030" },
        { name: "Amber", primary: "#d97706", secondary: "#303030" },
        { name: "Mint", primary: "#03bb85", secondary: "#303030" },
    ]

    const { recuperarTema, redefinirTema } = useTemaContext();
    const tema = recuperarTema();
    const [darkMode, setDarkMode] = useState(tema?.darkMode || false)
    const [primaryColor, setPrimaryColor] = useState(tema?.primaryColor || "#03bb85")
    const [secondaryColor, setSecondaryColor] = useState(tema?.secondaryColor || "#303030")
    const [borderRadius, setBorderRadius] = useState(tema?.borderRadius || 8)

    useEffect(() => {
        document.documentElement.style.setProperty('--primary', primaryColor)
        document.documentElement.style.setProperty('--secondary', secondaryColor)
        document.documentElement.style.setProperty('--radius', `${borderRadius}px`)
        document.documentElement.classList.toggle('dark', darkMode)
    }, [primaryColor, secondaryColor, borderRadius, darkMode])

    const handleRedefinirTema = () => {
        setDarkMode(false);
        setPrimaryColor("#03bb85");
        setSecondaryColor("#303030");
        setBorderRadius(8);
        redefinirTema();
        handleSave();
    }

    const handleSave = () => {
        const usuario = JSON.parse(localStorage.getItem('usuario') as string);

        const config = {
            darkMode,
            primaryColor,
            secondaryColor,
            borderRadius,
            usuario: {
                id: usuario.id,
            }
        }
        localStorage.setItem("tema", JSON.stringify(config));

        toast.promise(Api.post("configuracao/tema", config, {}).then(async () => {
            toast.success("Tema alterado com sucesso!");
        }).catch((error) => {
            toast.error(
                error.response.data
                    .join(';\n\n'),
                {
                    style: {
                        whiteSpace: 'pre-line',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                    },
                }
            );
        }), {
            loading: "Salvando...",
        });
    }

    return {
        colorPresets,
        darkMode,
        setDarkMode,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        borderRadius,
        setBorderRadius,
        handleRedefinirTema,
        handleSave,
    }
}