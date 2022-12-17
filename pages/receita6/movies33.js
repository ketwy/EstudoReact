import useSWR from "swr";
import { useState } from "react";
import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container } from "reactstrap";

let onClickSort;
let order = "ASC";

export default function Movies3() {
  const [state, setState] = useState({
    url: "",
    titleSearchString: "",
    orderBy: { index: "", order: "ASC" },
  });
  const [validate, setValidate] = useState({ message: "" });
  const { data} = useSWR(state.url, async () => {
    if (!state.url || !state.titleSearchString) return { Search: "" };
    if (state.url === "" || state.titleSearchString === "")
      return { Search: "" };
    const res = await fetch(
      `${state.url}/?apiKey=fe65a93e&s=${state.titleSearchString}`
    );
    const json = await res.json();
    return json;
  });

  if (state.orderBy && state.orderBy.index !== "") {
    if (data) {
      data.Search.sort((a, b) => {
        if (state.orderBy.order === "ASC") {
          return a[state.orderBy.index] > b[state.orderBy.index] ? 1 : -1;
        } else {
          return b[state.orderBy.index] > a[state.orderBy.index] ? 1 : -1;
        }
      });
    }
  }

  onClickSort = (dataIndex) => {
    setState({
      url: "https://www.omdbapi.com",
      titleSearchString: state.titleSearchString,
      orderBy: {
        index: dataIndex,
        order: state.orderBy.order === "ASC" ? "DESC" : "ASC",
      },
    });

    order = state.orderBy.order === "ASC" ? "DESC" : "ASC";
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    let s = document.getElementById("titleSearchString").value;
    if (s === "") {
      setValidate({ message: "Título vazio!" });
    } else {
      if (state.url === "") {
        setState({
          url: "https://www.omdbapi.com",
          titleSearchString: s,
          orderBy: state.orderBy,
        });
      } else {
        setState({
          url: "",
          titleSearchString: state.titleSearchString,
          orderBy: state.orderBy,
        });
      }
      setValidate({ message: "" });
    }
  };

  return (
    <div>
      <div>
        <Head>
          <title> Encontre seu Filme </title>
        </Head>
      </div>
      <Nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <div class="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="../">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/receita6/movies33">
                Receita 6
              </a>
              <a className="btn btn-outline-light" href="/receita6/movies35">
                questao 4
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/receita9/1">
                Receita 9
              </a>
            </li>
          </ul>
        </div>
      </Nav>
      <Container>
        <div className="row">
          <div className="mt-3">
            <TheForm message={validate.message} />
            <TheLink url={state.url} handler={onClickHandler} />
          </div>
          <div className="mt-3">
            <TheMovies
              data={data ? data : { Search: "" }}
              show={state.url !== ""}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export function TheForm({ message }) {
  return (
    <div className="card text-center">
      <div className="card-body">
        <h5 className="card-title">Qual filme você quer encontrar?</h5>
        <h6 className="card-subtitle mb-2 text-muted">digite o título</h6>
        <form className="form-inline ">
          <div className="form-group mb-3">
            <input
              placeholder="Digite o título..."
              className="form-control form-control-lg"
              id="titleSearchString"
              name="titleSearchString"
            />
            <p style={{ color: "red" }}>{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TheMovies({ data, show }) {
  if (!show) return <div></div>;
  if (!data) return <div></div>;
  if (data.error) return <div>Falha na pesquisa</div>;
  if (data.Error) return <div>Filme não encontrado na pesquisa</div>;
  if (data.Search === "")
    return (
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div className="table-responsive" style={{ marginLeft: "1rem" }}>
      <table className="table table-striped table-hover">
        <thead className="table-primary">
          <tr align="center">
            <th scope="col">
              <>
                FIlme <SortIcon dataIndex="Title" />
              </>
            </th>
            <th scope="col">
              <>
                Ano <SortIcon dataIndex="Year" type="number" />
              </>
            </th>
            <th scope="col">
              <>
                Tipo <SortIcon dataIndex="Type" />
              </>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.Search.map((m) => (
            <tr key={m.imdbID}>
              <td align="center">
                <a key={m.imdbID} href={"/onemovie/" + m.imdbID}>
                  {m.Title}
                </a>
              </td>
              <td align="center">
                <a key={m.imdbID} href={"/onemovie/" + m.imdbID}>
                  {m.Year}
                </a>
              </td>
              <td align="center">
                <a key={m.imdbID} href={"/onemovie/" + m.imdbID}>
                  {m.Type}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TheLink({ url, handler }) {
  return (
    <div>
      <button
        className="btn btn-outline-primary btn-sm"
        ghost
        href="/movies33.js"
        onClick={handler}
      >
        {" "}
        {url === "" ? "Exibir" : "Ocultar"}
      </button>
    </div>
  );
}

export function SortIcon({ dataIndex }) {
  return (
    <button
      onClick={() => onClickSort(dataIndex)}
      className="btn btn-primary btn-sm"
    >
      ordenar
    </button>
  );
}