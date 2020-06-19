import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: 0,
      title : `Desafio ReactJS ${Date.now()}`,
      url : 'http://github.com/marcelosnts/conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS']
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const repositoriesArray = [...repositories];
    const repositoryIndex = repositoriesArray.findIndex(repository => repository.id === id);

    repositoriesArray.splice(repositoryIndex, 1);

    setRepositories([...repositoriesArray]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
