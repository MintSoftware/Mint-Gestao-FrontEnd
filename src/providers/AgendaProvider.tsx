import { useAgenda } from "@/hooks/useAgenda";
import { createContext, ReactNode, useContext } from "react";

type AgendaContextType = ReturnType<typeof useAgenda>;

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export const AgendaProvider = ({ children }: { children: ReactNode }) => {
    const agenda = useAgenda();

    return (
        <AgendaContext.Provider value={agenda}>
            {children}
        </AgendaContext.Provider>
    );
};

export const useAgendaContext = () => {
    const context = useContext(AgendaContext);

    if (context === undefined) {
        throw new Error("useAgendaContext must be used within an AgendaProvider");
    }

    return context;
};