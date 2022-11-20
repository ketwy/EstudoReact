import useSWR, { unstable_serialize } from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container } from "reactstrap";

export default function Movies3() {
  const router = useRouter();
  const { key } = router.query;
  const [url, setUrl] = useState("");

  const { data, error } = useSWR(url, theFetcher);

  const onClickHandler = (e) => {
    e.preventDefault();

    if (url === "") setUrl("http://www.omdbapi.com/?apikey=25a45914&s=" + key);
    else setUrl("");
  };

  return (
    <div>
      <div>
        <div>
          <Head>
            <title> Encontre seu Filme </title>
          </Head>
        </div>
        <div className="p-5 text-center bg-light">
          <h6 className="text-primary">busca por:</h6>
          <h1>{key}</h1>
        </div>
        <Nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <div class="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="../">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </Nav>
        <Container>
          <div>
            <div className="mt-3">
              <div className="row">
                <TheLink url={url} handler={onClickHandler} />
              </div>

              <TheMovies
                data={
                  error
                    ? { error: "Erro na pesquisa" }
                    : data
                    ? data
                    : { Search: "" }
                }
                show={url !== ""}
              />
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

async function theFetcher(url) {
  if (url === null || url === "") return { Search: "" };
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

export function TheMovies({ data, show }) {
  if (!show) return <div></div>;
  if (data.Error) return <div>falha na requisição</div>;
  if (data.Search === "")
    return (
      <div className="spinner-grow text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  return (
    <div>
      <table className="table mt-2 table-primary">
        <thead>
          <tr>
            <th scope="col">Título</th>
          </tr>
        </thead>
        <tbody>
          {data.Search.map((m) => (
            <tr>
              <td scope="row">
                <a key={m.imdID} href={"../onemovie/" + m.imdbID}>
                  {m.Title} --- {m.Year}
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
      <a href="/movies3.js" onClick={handler}>
        <button className="btn btn-outline-info btn-lg btn-block" type="button">
          {" "}
          {url === "" ? "Mostrar" : "Ocultar"}{" "}
        </button>
      </a>
    </div>
  );
}
