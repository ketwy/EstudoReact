import useSWR from "swr";
import { useState } from "react";
import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Container } from "reactstrap";

export default function Movies35() {
  const [state, setState] = useState({
    url: "",
    titleSearchString: "",
    yearSearchString: "",
    typeSearchString: "",
  });
  const [validate, setValidate] = useState({ message: "" });
  const { data, error } = useSWR(state.url, async (u) => {
    if (
      !state.url &&
      !state.titleSearchString &&
      !state.yearSearchString &&
      !state.typeSearchString
    )
      return { Search: "" };
    if (
      state.url === "" &&
      state.titleSearchString === "" &&
      state.yearSearchString === "" &&
      state.typeSearchString === ""
    )
      return { Search: "" };
    const res = await fetch(
      `${state.url}/?apiKey=fe65a93e&s=${state.titleSearchString}&y=${state.yearSearchString}&type=${state.typeSearchString}`
    );
    const json = await res.json();
    return json;
  });

  const onClickHandler = (e) => {
    e.preventDefault();
    let s = document.getElementById("titleSearchString").value;
    let t = document.getElementById("yearSearchString").value;
    let v = document.getElementById("typeSearchString").value;
    if (s === "") {
      setValidate({ message: "Título vazio!" });
    } else {
      if (state.url === "") {
        setState({
          url: "https://www.omdbapi.com",
          titleSearchString: s,
          yearSearchString: t,
          typeSearchString: v,
        });
      } else {
        setState({
          url: "",
          titleSearchString: state.titleSearchString,
          yearSearchString: state.yearSearchString,
          typeSearchString: state.yearSearchString,
        });
      }
      setValidate({ message: "" });
    }
  };

  return (
    <div>
      <Head>
        <title> Encontre seu Filme </title>
      </Head>
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
      <Container
        style={{
          margin: "50px 40px 0",
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 0,
            minHeight: 480,
          }}
        >
          <TheForm message={validate.message} />
          <TheLink url={state.url} handler={onClickHandler} />
          <TheMovies
            data={data ? data : { Search: "" }}
            show={state.url !== ""}
          />
        </div>
      </Container>
    </div>
  );
}

export function TheForm({ message }) {
  return (
    <div>
      <form>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              Título
            </span>
          </div>
          <input
            className="form-control form-control-sm "
            id="titleSearchString"
            name="titleSearchString"
            type="text"
            autoComplete="true"
            required
            placeholder="Ex: Barbie"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              Ano
            </span>
          </div>
          <input
            className="form-control form-control-sm"
            id="yearSearchString"
            name="yearSearchString"
            type="text"
            autoComplete="true"
            required
            placeholder="Ex: 2002"
          />
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">
              Tipo da obra
            </span>
          </div>
          <input
            className="form-control form-control-sm"
            id="typeSearchString"
            placeholder='"movie", "series", "video"'
            name="typeSearchString"
            type="text"
            autoComplete="true"
            required
          />
        </div>          
        <p style={{ color: "red" }}>{message}</p>
      </form>
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
            <th scope="col">Filme</th>
            <th scope="col">Ano</th>
            <th scope="col">Tipo</th>
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
        href="/movies35.js"
        onClick={handler}
      >
        {" "}
        {url === "" ? "Exibir" : "Ocultar"}
      </button>
    </div>
  );
}
