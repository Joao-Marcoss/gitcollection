import React, { useEffect, useRef, useState } from "react";
import { api } from "../../services/api";

import { Link } from "react-router-dom";
import * as C from "./style";
import { FiChevronRight } from "react-icons/fi";

import logo from "../../img/logo (1).svg";

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem("@GitCollection:repositories");
    if (storageRepos) {
      return JSON.parse(storageRepos);
    }
    return [];
  });
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const formEl = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    localStorage.setItem("@GitCollection:repositories", JSON.stringify(repos));
  }, [repos]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Informe o username/repositório");
      return;
    }
    try {
      const response = await api.get<GithubRepository>(`repos/${newRepo}`);

      console.log();

      const repository = response.data;

      setRepos([...repos, repository]);
      formEl.current?.reset();
      setNewRepo("");
      setInputError("");
    } catch {
      setInputError("Repositório nao encontrado no github");
    }
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <C.Title>Catálogo de repositórios do Github</C.Title>

      <C.Form
        ref={formEl}
        hasError={Boolean(inputError)}
        onSubmit={handleAddRepo}
      >
        <input
          type="text"
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </C.Form>

      {inputError && <C.Error>{inputError}</C.Error>}

      <C.Repos>
        {repos.map((repository, index) => (
          <Link
            to={`/repositories/${encodeURIComponent(repository.full_name)}`}
            key={repository.full_name + index}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </C.Repos>
    </>
  );
};
export default Dashboard;
