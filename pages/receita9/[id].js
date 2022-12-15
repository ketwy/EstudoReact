import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container } from "reactstrap";

export default function Movies3({ data }) {
  return (
    <div>
      <div>
        <Head>
          <title> Episódios de Rick and Morty </title>
        </Head>
      </div>
      <div className="p-5 text-center bg-light">
        <h1>Rick and Morty</h1>
        <p>by: Ketlly Azevedo de Medeiros</p>
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
              <a className="nav-link" href="/receita9/1">
                Receita 9
              </a>
            </li>
          </ul>
        </div>
      </Nav>
      <Container>
        <div className="row">
          <div class="mt-3">
            <TheMovie data={data} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export function TheMovie({ data }) {
  if (!data) return <div>Carregando...</div>;
  if (!data.id) return <div> episodio enixistente </div>;
  return (
    <div>
      <div>
        <h1>Nome do epsódio: {data.name} </h1> 
        <h3>epsódio:{data.episode}</h3>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
      { params: { id: "5" } },
      { params: { id: "6" } },
      { params: { id: "7" } },
      { params: { id: "8" } },
      { params: { id: "9" } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/
${params.id}`);
  console.log("impressao do fetch");
  console.log(res);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
