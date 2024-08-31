import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Api from "@/infra/api"
import { Check, Moon, Palette, Sliders, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const colorPresets = [
    { name: "Indigo", primary: "#4f46e5", secondary: "#5c5c5c" },
    { name: "Rose", primary: "#e11d48", secondary: "#5c5c5c" },
    { name: "Amber", primary: "#d97706", secondary: "#5c5c5c" },
    { name: "Mint", primary: "#03bb85", secondary: "#5c5c5c" },
]

export default function PageAparencia() {
    const savedConfig = localStorage.getItem("themeConfig")
    const config = JSON.parse(savedConfig || "{}")
    const [isDarkMode, setIsDarkMode] = useState(config.isDarkMode || false)
    const [primaryColor, setPrimaryColor] = useState(config.primaryColor || "#03bb85")
    const [secondaryColor, setSecondaryColor] = useState(config.secondaryColor || "#5c5c5c")
    const [borderRadius, setBorderRadius] = useState(config.borderRadius || 8)

    useEffect(() => {
        document.documentElement.style.setProperty('--primary', primaryColor)
        document.documentElement.style.setProperty('--secondary', secondaryColor)
        document.documentElement.style.setProperty('--radius', `${borderRadius}px`)
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [primaryColor, secondaryColor, borderRadius, isDarkMode])

    const handleSave = () => {
        const usuario = JSON.parse(localStorage.getItem('usuario') as string);

        const config = {
            isDarkMode,
            primaryColor,
            secondaryColor,
            borderRadius,
            usuario: {
                id: usuario.id,
            }
        }
        localStorage.setItem("themeConfig", JSON.stringify(config));

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
        <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Aparência</h2>
                <div className="flex items-center space-x-2">
                    <Sun className="h-5 w-5" />
                    <Switch
                        checked={isDarkMode}
                        onCheckedChange={(checked) => setIsDarkMode(checked)}
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
                    <Button onClick={handleSave} className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Salvar Configurações
                    </Button>
                </div>
            </div>
        </div>
    )
}