import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { api } from "../../services/api";

import logo from "../../img/logo (1).svg";

import * as C from "./styles";
import { RepoInfo } from "./styles";

interface GithubRepository {
  full_name: string;
  description: string;
  forks_count: number;
  open_issues_count: number;
  stargazes_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface GithubIssue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

type IRepoParams = {
  repository: string;
};

const Repo: React.FC = () => {
  const [repositorys, setRepositorys] = useState<GithubRepository | null>(null);

  const [issues, setIssues] = useState<GithubIssue[]>([]);

  const { repository } = useParams<IRepoParams>();

  useEffect(() => {
    api
      .get(`repos/${repository}`)
      .then((response) => setRepositorys(response.data));
    api
      .get(`repos/${repository}/issues`)
      .then((response) => setIssues(response.data));
  }, [repository]);

  return (
    <>
      <C.Header>
        <img src={logo} alt="GitCollection" />
        <Link to="/">
          <FiChevronLeft size={20} />
          Voltar
        </Link>
      </C.Header>

      {repositorys && (
        <C.RepoInfo>
          <header>
            <img
              src={repositorys.owner.avatar_url}
              alt={repositorys.owner.login}
            />
            <div>
              <strong>{repositorys.full_name}</strong>
              <p>{repositorys.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repositorys.stargazes_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repositorys.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repositorys.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </C.RepoInfo>
      )}

      <C.Issues>
        {issues.map((issue) => (
          <a href={issue.html_url} key={issue.id}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </C.Issues>
    </>
  );
};
export default Repo;
