import { createContext, FC, useCallback, useEffect, useMemo, useState } from "react";

interface IContext {
    inputValue: number;
    setInputValue: React.Dispatch<React.SetStateAction<number>>;
}

export const InputContext = createContext<IContext>({} as IContext);

export const InputProvider = ({children}: {children: any}) => {
    const [inputValue, setInputValue] = useState(0.01);

    const value = useMemo(() => ({
        inputValue, setInputValue
    }), [inputValue])

      
    return <InputContext.Provider value={value}>
      {children}
    </InputContext.Provider>
}