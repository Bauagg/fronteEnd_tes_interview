import { BrowserRouter } from "react-router-dom";
import RouterAplication from "./routes";
import { Provider } from "react-redux";
import storeRedux from "./redux/store/store";

function App() {
  return (
    <div>
      <Provider store={storeRedux}>
        <BrowserRouter>
          <RouterAplication />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
