import React, { useState } from "react";
import "./App.css";

function App() {
  const [numDados, setNumDados] = useState(1);
  const [numCaras, setNumCaras] = useState(6);
  const [numComparacion, setNumComparacion] = useState(7);
  const [dificultad, setDificultad] = useState("individual");
  const [resultados, setResultados] = useState([]);
  const [resultadoFinal, setResultadoFinal] = useState(null);

  const lanzarDados = () => {
    const resultadosIndividuales = [];
    for (let i = 0; i < numDados; i++) {
      const resultado = Math.floor(Math.random() * numCaras) + 1;
      resultadosIndividuales.push(resultado);
    }

    setResultados(resultadosIndividuales);

    if (dificultad === "individual") {
      const exitos = resultadosIndividuales.filter(
        (resultado) => resultado >= numComparacion
      );
      setResultadoFinal({
        exitos: exitos.length,
        fracasos: numDados - exitos.length,
        sumatoria: null,
        esExitoso: null,
      });
    } else if (dificultad === "acumulada") {
      const sumatoria = resultadosIndividuales.reduce(
        (sum, resultado) => sum + resultado,
        0
      );
      const esExitoso = sumatoria >= numComparacion;
      setResultadoFinal({
        exitos: null,
        fracasos: null,
        sumatoria: sumatoria,
        esExitoso: esExitoso,
      });
    }
  };

  return (
    <div className="contenedor">
      <div className="contenido">
        <h1 className="titulo">Lanzador de Dados</h1>
        <div className="grupo-formulario">
          <label>Número de Dados</label>
          <select
            value={numDados}
            onChange={(e) => setNumDados(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="grupo-formulario">
          <label>Número de Caras</label>
          <select
            value={numCaras}
            onChange={(e) => setNumCaras(Number(e.target.value))}
          >
            <option value={4}>4</option>
            <option value={6}>6</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={12}>12</option>
            <option value={20}>20</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="grupo-formulario">
          <label>Número de Comparación</label>
          <input
            type="number"
            value={numComparacion}
            onChange={(e) => setNumComparacion(Number(e.target.value))}
          />
        </div>
        <div className="grupo-formulario">
          <label>Dificultad</label>
          <select
            value={dificultad}
            onChange={(e) => setDificultad(e.target.value)}
          >
            <option value="individual">Individual</option>
            <option value="acumulada">Acumulada</option>
          </select>
        </div>
        <button className="boton-lanzar" onClick={lanzarDados}>
          Lanzar Dados
        </button>
        <div className="resultado-final">
          {resultadoFinal && dificultad === "individual" && (
            <p>
              Exitos: <span className="exito">{resultadoFinal.exitos}</span>
              <br />
              Fracasos: <span className="fracaso">{resultadoFinal.fracasos}</span>
            </p>
          )}
          {resultadoFinal && dificultad === "acumulada" && (
            <p>
              Sumatoria: {resultadoFinal.sumatoria}
              <br />
              Resultado:{" "}
              <span className={resultadoFinal.esExitoso ? "exito" : "fracaso"}>
                {resultadoFinal.esExitoso ? "Éxito" : "Fracaso"}
              </span>
            </p>
          )}
        </div>
        <div className="resultados-individuales">
          {resultados.map((resultado, index) => (
            <div
              className={`dado ${
                dificultad === "individual" && resultado >= numComparacion
                  ? "resultado-exito"
                  : dificultad === "individual"
                  ? "resultado-fracaso"
                  : ""
              }`}
              key={index}
            >
              {resultado}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
