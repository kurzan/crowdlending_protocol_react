import { useRouteError } from "react-router-dom";
import LayoutPage from "../../pages/layout/Layout";

const ErrorBoundary = () => {
    let error = useRouteError();
    console.error(error);
    // Uncaught ReferenceError: path is not defined
    return (
            <div>What's wrong, please reload the page!</div>
    );
  }

  export default ErrorBoundary