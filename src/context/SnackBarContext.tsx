import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import { SnackBar } from "types/context/snackbar";

// create the context with a default value
export const SnackBarContext = createContext<
  [SnackBar | null, any, any]
>([null, null, null]);


export default function SnackBarProvider({ children }: { children: any }) {
  const [snackBar, setSnackBar] = useState<SnackBar | null>(null)

  useEffect(() => {
    setTimeout(() => {
      //clear snackbar data
      clear()
    }, 5000)
  }, [snackBar])

  function clear() {
    setSnackBar(null)
  }

  return (
    <SnackBarContext.Provider value={[snackBar, setSnackBar, clear]}>
      {children}
    </SnackBarContext.Provider>
  )
}
