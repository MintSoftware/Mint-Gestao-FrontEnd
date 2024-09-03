import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Api from "@/infra/api"
import { useTemaContext } from "@/providers/TemaProvider"
import { Check, Moon, Palette, RotateCcwIcon, Sliders, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const colorPresets = [
    { name: "Indigo", primary: "#4f46e5", secondary: "#303030" },
    { name: "Rose", primary: "#e11d48", secondary: "#303030" },
    { name: "Amber", primary: "#d97706", secondary: "#303030" },
    { name: "Mint", primary: "#03bb85", secondary: "#303030" },
]

export default function PageAparencia() {
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

    const PreviewCard = () => (
        <Card className="w-full p-4 transition-all duration-300 ease-in-out">
            <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>Prévia do Tema</h3>
            <p className="text-sm mb-4">Esta é uma prévia das suas configurações atuais.</p>
            <Button className="mr-2" style={{ backgroundColor: primaryColor }}>Botão Primário</Button>
            <Button variant="outline" style={{ color: secondaryColor, borderColor: secondaryColor }}>Botão Secundário</Button>
        </Card>
    )

    return (
        <AlertDialog>
            <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold">Aparência</h2>
                    <div className="flex items-center space-x-2">
                        <Sun className="h-5 w-5" />
                        <Switch
                            checked={darkMode}
                            onCheckedChange={(checked) => setDarkMode(checked)}
                        />
                        <Moon className="h-5 w-5" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Tabs defaultValue="colors">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="colors"><Palette className="mr-2 h-4 w-4" /> Cores</TabsTrigger>
                                <TabsTrigger value="layout"><Sliders className="mr-2 h-4 w-4" /> Layout</TabsTrigger>
                            </TabsList>
                            <TabsContent value="colors" className="space-y-4">
                                <div>
                                    <Label htmlFor="primaryColor">Cor Primária</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <input
                                            type="color"
                                            id="primaryColor"
                                            value={primaryColor}
                                            onChange={(e) => setPrimaryColor(e.target.value)}
                                            className="w-12 h-12 rounded-md border border-input"
                                        />
                                        <span>{primaryColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="secondaryColor">Cor Secundária</Label>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <input
                                            type="color"
                                            id="secondaryColor"
                                            value={secondaryColor}
                                            onChange={(e) => setSecondaryColor(e.target.value)}
                                            className="w-12 h-12 rounded-md border border-input"
                                        />
                                        <span>{secondaryColor}</span>
                                    </div>
                                </div>
                                <div>
                                    <Label>Presets de Cores</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {colorPresets.map((preset) => (
                                            <Button
                                                key={preset.name}
                                                variant="outline"
                                                className="justify-start"
                                                onClick={() => {
                                                    setPrimaryColor(preset.primary)
                                                    setSecondaryColor(preset.secondary)
                                                }}
                                            >
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                                                    <span>{preset.name}</span>
                                                </div>
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="layout" className="space-y-4">
                                <div>
                                    <Label htmlFor="borderRadius">Raio de Borda: {borderRadius}px</Label>
                                    <Slider
                                        id="borderRadius"
                                        min={0}
                                        max={20}
                                        step={1}
                                        value={[borderRadius]}
                                        onValueChange={(value) => setBorderRadius(value[0])}
                                        className="mt-2 border rounded"
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="space-y-6">
                        <PreviewCard />
                        <div className="flex gap-2">
                            <AlertDialogTrigger>
                                <Button variant="outline" className="w-30%">
                                    <RotateCcwIcon className="mr-2 w-4 h-4" />Redefinir
                                </Button>
                            </AlertDialogTrigger>
                            <Button onClick={handleSave} className="w-full">
                                <Check className="mr-2 h-4 w-4" /> Salvar Configurações
                            </Button>
                        </div>
                        <div>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Redefinir</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Deseja realmente redefinir o tema?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Não</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleRedefinirTema}>
                                        Sim
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </div>
                    </div>
                </div>
            </div>
        </AlertDialog>
    )
}