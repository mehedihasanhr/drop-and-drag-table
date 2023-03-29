import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "./components/Table";
import "@ant-design/flowchart/dist/index.css";
import Charts from "./components/Charts";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="">
      <div className="w-screen h-screen overflow-x-auto p-10">
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/chart" element={<Charts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
