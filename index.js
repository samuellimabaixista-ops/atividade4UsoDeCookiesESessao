import express from 'express';
import session from 'express-session';  
import cookieParser from 'cookie-parser';

const host = '0.0.0.0';
const porta = 3500;

const app = express();
var listaprodutos=[];

app.use(session({
    secret:'M1nh4Ch4v3S3cr3t4',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure:false,
        httpOnly: true,
        maxAge: 1000 * 60 * 15 //15 minutos
    }
}));

app.use(cookieParser());

app.use(express.urlencoded({extended:true}));

app.get('/', estaAutenticado,(req, res) => {
    res.write(`
         <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>MENU DO SISTEMA</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
            `);
    res.write(`
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/menu">MENU</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                     </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">   
                    
                        <li class="nav-item">
                            <a class="nav-link" href="/home">HOME</a>
                        </li> 
                        
                         <li class="nav-item">
                            <a class="nav-link" href="/login">LOGIN</a>
                        </li>   
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="livros" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CADASTRO LIVROS
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/produtos">Cadastrar Livros</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/listalivros">Listar Livros</a></li>    
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="leitores" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CADASTRO LEITORES
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/produtos">Cadastrar Leitores</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/listaleitores">Listar Leitores</a></li>    
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">LOGOUT</a>
                        </li>   
                    </ul>
                </div>
            </div>
            </nav>
        `);    

    res.write(`
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </html> `);    
   
    res.end();
});

app.get('/home', (req, res) => {
    res.write(`
         <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Pagina Inicial</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
    `);
    res.write(`
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/menu">MENU</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">   
                    
                         <li class="nav-item">
                            <a class="nav-link" href="/home">HOME</a>
                        </li> 
                        
                         <li class="nav-item">
                            <a class="nav-link" href="/login">LOGIN</a>
                        </li>   
                        <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="livros" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CADASTRO
                                </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/produtos">Cadastrar Livros</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="/listalivros">Listar Livros</a></li>    
                                    </ul>
                        </li>
                          <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="leitores" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CADASTRO
                                </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/produtos">Cadastrar Leitores</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="/listaleitores">Listar Leitores</a></li>    
                                    </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/logout">LOGOUT</a>
                        </li>   
                    </ul>
                </div>
            </div>
            </nav>
        `);    

    res.write(`
            </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </html> `);    
   
    res.end();
});

app.get('/livros', estaAutenticado, (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Formulário de Cadastro de Livros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body> 
                <div class = "container mt-5"> 
                    <form method="POST" action="/livros" class="row g-3">        
                            <legend><h3>
                                Cadastro de Livros:</h3>
                            </legend>
                        <div class="col-md-6">
                            <label for="inputtitulo" class="form-label">Título do Livro</label>
                            <input type="text" class="form-control" id="titulo" name="titulo">
                        </div>
                        <div class="col-md-6">
                            <label for="inputautor" class="form-label">Nome do Autor:</label>
                            <input type="text" class="form-control" id="autor" name="autor">
                        </div>
                        <div class="col-md-6">
                            <label for="inputcodigo" class="form-label">Código ISBN/ Identificação:</label>
                            <input type="number" class="form-control" id="codigo" name="codigo">
                        </div>
                                           
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Cadastrar Livro</button>
                        </div>
                    </form>
               </div> 
               
            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>     
        `);
    res.end();

});
app.post("/livros", estaAutenticado, (requisicao, resposta) => {

    const titulo=requisicao.body.titulo;
    const autor=requisicao.body.autor;
    const codigo=requisicao.body.codigo;
         
    if(!titulo || !autor || !codigo) {
         let html= `  
            <html lang="pt-br">
                <head>
                    <meta charset = "UTF-8">
                    <title>Formulário de Livros</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
                </head>
                <body> 
                    <div class = "container mt-5"> 
                        <form method="POST" action="/livros" class="row g-3">        
                                <legend><h3>
                                    Cadastro de Livros:</h3>
                                </legend>

                             <div class="col-md-6">
                                <label for="inputtitulo" class="form-label">Título do Livro</label>
                                <input type="text" class="form-control" id="titulo" name="titulo" value="${titulo}">`;
                   
                                if(!titulo){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o título do livro!
                                            </div>`;
                                }
                                html+= `
                            </div>

                             <div class="col-md-6">
                                <label for="inputautor" class="form-label">Nome do Autor</label>
                                <input type="text" class="form-control" id="autor" name="autor" value="${autor}">`;
                            
                                if(!autor){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o nome do Autor!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputcodigo" class="form-label">Código ISBN/ Identificação:</label>
                                <input type="text" class="form-control" id="codigo" name="codigo" value="${codigo}">`;

                                 if(!codigo){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o Código do Livro!
                                            </div>`;
                                }
                                html+=`
                            </div>
                                                 
                                                                         
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Cadastrar</button>
                            </div>
                    </form>
                </div> 
                
             </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </html>`;
                 
        resposta.write(html);
        resposta.end();
    }
    else {
            listalivros.push(
                    {
                       "titulo":titulo,
                        "autor":autor,
                        "codigo":codigo,
                                            
                    }
             );
            resposta.redirect("/listalivros");     
     }
    
});
app.get("/listalivros", estaAutenticado,(requisicao, resposta) => {
    resposta.write(`
         <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Lista de Livros</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <div class = "container mt-5"> 
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Título do Livro</th>
                                <th scope="col">Autor</th>
                                <th scope="col">Código ISBN</th>
                            </tr>
                        </thead>
                        <tbody> `);
                            for(let i=0;i<listalivros.length;i++){
                                const livros =listalivros[i];
                                resposta.write(`
                                    <tr>
                                        <td>${livros.titulo}</td>
                                        <td>${livros.autor}</td>
                                        <td>${livros.codigo}</td>
                                    </tr>`)
                                <th scope="col">Lista de livros</th>
                                
                            </tr>
                        </thead>
                        <tbody> `);
                            for(let i=0;i<listalivros.length;i++){
                                const livros =listalivros[i];
                                resposta.write(`
                                    <tr>
                                        <td>${i+1}</td>
                                        <td>${livros.codigo}</td>
                                        <td>${livros.titulo}</td>
                                        <td>${livros.autor}</td>
                                        
                                    </tr>`)
                            }
                        resposta.write(`    </tbody>
                                        </table>
                                        <a href="/produtos" class="btn btn-primary">Adicionar Livro</a>
                                    </div>     
            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>  `);
    resposta.end();
});

app.get('/leitores', estaAutenticado, (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Formulário de Cadastro de Leitores:</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body> 
                <div class = "container mt-5"> 
                    <form method="POST" action="/leitores" class="row g-3">        
                            <legend><h3>
                                Cadastro de Leitores:</h3>
                            </legend>
                        <div class="col-md-6">
                            <label for="inputnome" class="form-label">Nome do Leitor</label>
                            <input type="text" class="form-control" id="nome" name="nome">
                        </div>
                        <div class="col-md-6">
                            <label for="inputcpf" class="form-label">Numero CPF ou Identificação:</label>
                            <input type="text" class="form-control" id="cpf" name="cpf">
                        </div>
                         <div class="col-md-6">
                            <label for="inputtelefone" class="form-label">Telefone para Contato:</label>
                            <input type="text" class="form-control" id="telefone" name="telefone">
                        </div>
                         <div class="col-md-6">
                            <label for="inputemprestimo" class="form-label">Data de Empréstimo:</label>
                            <input type="text" class="form-control" id="emprestimo" name="emprestimo">
                        </div>
                         <div class="col-md-6">
                            <label for="inputdevolucao" class="form-label">Data de Devolução:</label>
                            <input type="text" class="form-control" id="devolucao" name="devolucao">
                        </div>
                         <div class="col-md-6">
                            <label for="inputlivro" class="form-label">Nome do Livro:</label>
                            <input type="text" class="form-control" id="livro" name="livro">
                        </div>
                        
                         
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Cadastrar Leitor</button>
                        </div>
                    </form>
               </div> 
               
            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>     
        `);
    res.end();

});
app.post("/leitores", estaAutenticado, (requisicao, resposta) => {

    const nome=requisicao.body.nome;
    const cpf=requisicao.body.cpf;
    const telefone=requisicao.body.telefone;
    const emprestimo=requisicao.body.emprestimo;
    const devolucao=requisicao.body.devolucao;
    const livro=requisicao.body.livro;
         
    if(!nome || !cpf || !telefone || !emprestimo || !devolucao || !livro) {
         let html= `  
            <html lang="pt-br">
                <head>
                    <meta charset = "UTF-8">
                    <title>Formulário de Leitores</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
                </head>
                <body> 
                    <div class = "container mt-5"> 
                        <form method="POST" action="/leitores" class="row g-3">        
                                <legend><h3>
                                    Cadastro de Leitores:</h3>
                                </legend>

                             <div class="col-md-6">
                                <label for="inputnome" class="form-label">Nome Completo</label>
                                <input type="text" class="form-control" id="nome" name="nome" value="${nome}">`;
                   
                                if(!nome){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o nome completo!
                                            </div>`;
                                }
                                html+= `
                            </div>

                             <div class="col-md-6">
                                <label for="inputcpf" class="form-label">CPF</label>
                                <input type="text" class="form-control" id="cpf" name="cpf" value="${cpf}">`;
                            
                                if(!cpf){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o CPF!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputtelefone" class="form-label">Telefone</label>
                                <input type="text" class="form-control" id="telefone" name="telefone" value="${telefone}">`;
                                
                                if(!telefone){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o telefone!
                                            </div>`;
                                }
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputemprestimo" class="form-label">Data de Empréstimo</label>
                                <input type="date" class="form-control" id="emprestimo" name="emprestimo" value="${emprestimo}">`;
                                
                                if(!emprestimo){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira a data de empréstimo!
                                            </div>`;
                                }
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputdevolucao" class="form-label">Data de Devolução</label>
                                <input type="date" class="form-control" id="devolucao" name="devolucao" value="${devolucao}">`;
                                
                                if(!devolucao){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira a data de devolução!
                                            </div>`;
                                }
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputlivro" class="form-label">Nome doLivro</label>
                                <input type="text" class="form-control" id="livro" name="livro" value="${livro}">`;
                                
                                if(!livro){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o nome do livro!
                                            </div>`;
                                }
                                html+=`
                                                 
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary">Cadastrar</button>
                            </div>
                    </form>
                </div> 
                
             </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            </html>`;
                 
        resposta.write(html);
        resposta.end();
    }
    else {
            listaleitores.push(
                    {
                        
                        "nome":nome,
                        "cpf":cpf,
                        "telefone":telefone,
                        "emprestimo":emprestimo,
                        "devolucao":devolucao,
                        "livro":livro,

                    }
             );
            resposta.redirect("/listaleitores");     
     }
    
});
app.get("/listaleitores", estaAutenticado,(requisicao, resposta) => {
    resposta.write(`
         <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Lista de Leitores</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <div class = "container mt-5"> 
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nome do Leitor</th>
                                <th scope="col">CPF</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Data de Empréstimo</th>
                                <th scope="col">Data de Devolução</th>
                                <th scope="col">Livro Emprestado</th>
                            </tr>
                        </thead>
                        <tbody> `);
                            for(let i=0;i<listaleitores.length;i++){
                                const leitores =listaleitores[i];
                                resposta.write(`
                                    <tr>
                                        <td>${leitores.nome}</td>
                                        <td>${leitores.cpf}</td>
                                        <td>${leitores.telefone}</td>
                                        <td>${leitores.emprestimo}</td>
                                        <td>${leitores.devolucao}</td>
                                        <td>${leitores.livro}</td>
                                    </tr>`)
                                <th scope="col">Lista de Leitores</th>
                                
                            </tr>
                        </thead>
                        <tbody> `);
                            for(let i=0;i<listaleitores.length;i++){
                                const leitores =listaleitores[i];
                                resposta.write(`
                                    <tr>
                                        <td>${i+1}</td>
                                        <td>${leitores.nome}</td>
                                        <td>${leitores.cpf}</td>
                                        <td>${leitores.telefone}</td>
                                        <td>${leitores.emprestimo}</td>
                                        <td>${leitores.devolucao}</td>
                                        <td>${leitores.livro}</td>
                                    </tr>`)
                            }
                        resposta.write(`    </tbody>
                                        </table>
                                        <a href="/leitores" class="btn btn-primary">Adicionar Leitores</a>
                                    </div>     
            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>  `);
    resposta.end();
});

app.get("/login",(requisicao,resposta) => {

    const ultimoAcesso = requisicao.cookies?.ultimoAcesso || "Nunca Acessou";

    resposta.write(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Página de Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5 w-50">
            <h3>Login do Sistema</h3>
            <form action="/login" method="POST">

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="email@email.com">
            </div>

            <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" id="senha" name="senha" class="form-control" placeholder="****">
            </div>

            <button type="submit" class="btn btn-primary">
                ENTRAR
            </button>`);
    resposta.write(`
            <p class="mt-5 mb-3 text-body-secondary">Último Acesso: ${ultimoAcesso}</p>`);  

    resposta.write(`   
            </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
    </html> `);

    resposta.end();

});

app.post("/login", (requisicao, resposta) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;

    const emailcorreto = "senha@email.com";
    const senhacorreta = "123";

    if(email === emailcorreto && senha === senhacorreta){
        requisicao.session.logado = true;
        const dataUltimoAcesso = new Date();
        resposta.cookie("ultimoAcesso", dataUltimoAcesso.toLocaleString(),{maxAge:1000 * 60 * 30,httpOnly:true});
        resposta.redirect("/");
    }
    else{
        resposta.write(`
        <html lang="pt-br">
        <head>            <meta charset="UTF-8">
            <title>Página de Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5 w-50">
            <h3>Login do Sistema</h3>
            <form action="/login" method="POST">

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" name="email" id="email" class="form-control" placeholder="email@email.com">
            </div>

            <div class="mb-3">
                <label class="form-label">Senha</label>
                <input type="password" id="senha" name="senha" class="form-control" placeholder="****">
            </div>
            <span>
                <p class="text-danger">Email ou Senha Inválidos!</p>
            </span>
            <button type="submit" class="btn btn-primary">
                Entrar
            </button>
            </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>`);

        resposta.end();
    }        
});

app.get("/logout",(requisicao, resposta)=>{
    requisicao.session.destroy;
    resposta.redirect("/login");

});
//Middleware
function estaAutenticado(requisicao,resposta, proximo){
    if(requisicao.session?.logado){
        proximo();
    }
    else{
        resposta.redirect("/login");
    }
};

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});
