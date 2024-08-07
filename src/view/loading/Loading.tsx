import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

export default function Loading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 90 ? prev + 10 : 90));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#09090B]">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-primary">Carregando...</h1>
                    <p className="text-muted-foreground">Por Favor, aguarde enquanto preparamos tudo para você.</p>
                </div>
                <Progress value={progress} className="h-4 w-full rounded-full bg-muted" />
                <div className="absolute left-0 bottom-[95px] h-full w-full flex items-center justify-center text-white font-medium">
                    {progress}%
                </div>
                <div className="flex justify-center">
                    <LinechartChart className="w-[200px] aspect-square" />
                </div>
                <div className="flex justify-center space-x-4">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse delay-100" />
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse delay-200" />
                </div>
            </div>
        </div>
    );
}

function LinechartChart(props: any) {
    return (
        <div {...props}>
            <ChartContainer
                config={{
                    desktop: {
                        label: "Desktop",
                        color: "#03bb85",
                    },
                }}
            >
                <LineChart
                    accessibilityLayer
                    data={[
                        { month: "Janeiro", desktop: 186 },
                        { month: "Fevereiro", desktop: 305 },
                        { month: "Março", desktop: 237 },
                        { month: "Abril", desktop: 73 },
                        { month: "Maio", desktop: 209 },
                        { month: "Junho", desktop: 214 },
                    ]}
                    margin={{
                        left: 12,
                        right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
                </LineChart>
            </ChartContainer>
        </div>
    );
}
