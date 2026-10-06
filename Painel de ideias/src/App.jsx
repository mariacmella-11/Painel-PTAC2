import {useState} from "react";
import "./App.css";

function App() {
  const [ideias, setIdeias] = useState([]);
  const [novaIdeia, setNovaIdeia] = useState("");
  const [erro, setErro] = useState("");

  function adicionarIdeia(event) {
    event.preventDefault();

    if(novaIdeia.trim() === ""){
      setErro("Digite uma ideia válida");
      return;
    }

    const ideia = {
      id: Date.now(),
      texto: novaIdeia,
      feita: false,
    };

    setIdeias([...ideias, ideia]);
    setNovaIdeia("");
    setErro("");
  }

  function marcarFeita(id){
    const novasIdeias = ideias.map((ideia) => 
    ideia.id === id
    ?{...ideia, feita: !ideia.feita}
    :ideia
    )
    setIdeias(novasIdeias)
  }

  return(
    <div>
    <h1>💡Painel de ideias</h1>
    <p>Anote suas ideias para não perde-las</p>

    <form onSubmit={adicionarIdeia}>
      <input type="text" 
      value={novaIdeia}
      onChange={(e) => setNovaIdeia(e.target.value)}
      placeholder="Digite uma ideia"
       />

       <button type="submit">Adicionar</button>
    </form>

    {erro && <p>{erro}</p>}

    <ul>
      {ideias.map((ideia) => (
        <li key={ideia.id}>
          <input type="checkbox"
          checked={ideia.feita}
          onChange={() => marcarFeita(ideia.id)}
          />

          <span
          className={ideia.feita ? "concluida" : ""}
          >
            {ideia.texto}
          </span>
        </li>
      ))}
    </ul>
    </div>
  )
}

export default App