import { CheckTwo, CloseTwo, Programmer } from "@icon-link/react";
import { IconProvider } from "@icon-link/react";

function App() {

  return (
    <div className="App">
        <IconProvider value={{
            tag: 'i',
            size: 30,
            colors: {
                outline: {
                    fill: '#ff0000'
                }
            }
        }}>
            <CheckTwo></CheckTwo>
            <CloseTwo></CloseTwo>
            <Programmer></Programmer>
        </IconProvider>
    </div>
  )
}

export default App
