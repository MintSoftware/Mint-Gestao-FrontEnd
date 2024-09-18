import { useLocal } from "@/hooks/useLocal";
import { createContext, ReactNode, useContext } from "react";

type LocalContextType = ReturnType<typeof useLocal>;

const LocalContext = createContext<LocalContextType | undefined>(undefined);

export const LocalProvider = ({ children }: { children: ReactNode }) => {
    const local = useLocal();

    return (
        <LocalContext.Provider value={local}>
            {children}
        </LocalContext.Provider>
    );
};

export const useLocalContext = () => {
    const context = useContext(LocalContext);

    if (context === undefined) {
        throw new Error("useLocalContext must be used within an LocalProvider");
    }

    return context;
};