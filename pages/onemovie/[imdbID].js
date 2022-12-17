import useSWR, { unstable_serialize } from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container } from "reactstrap";

export default function Movies2() {
  const router = useRouter();
  const { imdbID } = router.query;
  const { data, error } = useSWR(
    `https://www.omdbapi.com/?apikey=25a45914&i=` + imdbID,
    fetcher
  );
  if (error) return <div>falha na requisição...</div>;
  if (!data)
    return (
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div>
      <div>
        <div>
          <Head>
            <title> Encontre seu Filme </title>
          </Head>
        </div>
        <div className="p-5 text-center bg-light">
          <h1>{data.Title}</h1>
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
              <div>
                <table className="table mt-2 table-bordered text-center">
                  <thead>
                    <tr>
                      <th scope="col">{data.Genre}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">
                        <h2>{data.Year}</h2>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <img src={data.Poster} />
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <h3>Disponibilizado {data.Released}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <h3>Tempo de duração {data.Runtime}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <h3>Enredo: {data.Plot}</h3>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <h4>Dirigido por: {data.Director}</h4>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        <h4>Elenco: {data.Actors}</h4>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

async function fetcher(url) {
  const res = await fetch(url);
  const json = await res.json();
  return json;
}
