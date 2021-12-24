import logo from "./logo.svg";
import "./App.css";
import Layout from "./Components/Layout";
import { ToastProvider } from "react-toast-notifications";
import LoaderProvider from "./Providers/LoaderProvider";

function App() {
  return (
    <div className="App">
      <LoaderProvider>
        <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
          <Layout />
        </ToastProvider>
      </LoaderProvider>
    </div>
  );
}

export default App;
