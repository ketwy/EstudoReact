import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Container } from "reactstrap";

export default function Movies3() {
  return (
    <div>
      <div>
        <Head>
          <title> Encontre seu Filme </title>
        </Head>
      </div>
      <div className="p-5 text-center bg-light">
        <h1>Busque seu filme</h1>
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
          <div class="mt-3">
            <NameForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    window.open("searchmovies/" + this.state.value, "_self");
    event.preventDefault();
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Qual filme você quer encontrar?</h5>
          <h6 className="card-subtitle mb-2 text-muted">digite o título</h6>
          <form className="form-inline " onSubmit={this.handleSubmit}>
            <div class="form-group mb-3">
              <input
                value={this.state.value}
                onChange={this.handleChange}
                placeholder="Digite o título..."
                className="form-control form-control-lg"
              />
            </div>
            <Button color="success" type="submit">
              Buscar
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
