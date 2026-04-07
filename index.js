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
                            <a class="nav-link dropdown-toggle" href="produtos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                CADASTRO
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/produtos">Cadastrar Produtos</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="/listaprodutos">Listar Produtos</a></li>    
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
                                <a class="nav-link dropdown-toggle" href="produtos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CADASTRO
                                </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="/produtos">Cadastrar Produtos</a></li>
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="/listaprodutos">Listar Produtos</a></li>    
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

app.get('/produtos', estaAutenticado, (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Formulário de Cadastro de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body> 
                <div class = "container mt-5"> 
                    <form method="POST" action="/produtos" class="row g-3">        
                            <legend><h3>
                                Cadastro de Produtos:</h3>
                            </legend>
                        <div class="col-md-6">
                            <label for="inputCodigoBarras" class="form-label">Código de Barras</label>
                            <input type="text" class="form-control" id="codigoBarras" name="codigoBarras">
                        </div>
                        <div class="col-md-6">
                            <label for="inputdescricaoProduto" class="form-label">Descrição Produto</label>
                            <input type="text" class="form-control" id="descricaoProduto" name="descricaoProduto">
                        </div>
                        <div class="col-md-6">
                            <label for="inputprecoCusto" class="form-label">Preço de Custo</label>
                            <input type="number" class="form-control" id="precoCusto" name="precoCusto">
                        </div>
                        <div class="col-md-6">
                            <label for="inputprecoVenda" class="form-label">Preço de Venda</label>
                            <input type="number" class="form-control" id="precoVenda" name="precoVenda">
                        </div>
                        
                        <div class="col-md-6">
                            <label for="inputdataValidade" class="form-label">Data Validade</label>
                            <input type="text" class="form-control" id="dataValidade" name="dataValidade">
                        </div>
                        <div class="col-md-6">
                            <label for="inputquantidadeEstoque" class="form-label">Quantidade Estoque</label>
                            <input type="text" class="form-control" id="quantidadeEstoque" name="quantidadeEstoque">
                        </div>
                        <div class="col-md-6">
                            <label for="inputnomeFabricante" class="form-label">Nome Fabricante</label>
                            <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante">
                        </div>
                        
                        <div class="col-12">
                            <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
                        </div>
                    </form>
               </div> 
               
            </body>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>     
        `);
    res.end();

});
app.post("/produtos", estaAutenticado, (requisicao, resposta) => {

    const codigoBarras=requisicao.body.codigoBarras;
    const descricaoProduto=requisicao.body.descricaoProduto;
    const precoCusto=requisicao.body.precoCusto;
    const precoVenda=requisicao.body.precoVenda;
    const dataValidade = requisicao.body.dataValidade;
    const quantidadeEstoque=requisicao.body.quantidadeEstoque;
    const nomeFabricante=requisicao.body.nomeFabricante;
   
       
    if(!codigoBarras || !descricaoProduto || !precoCusto || !precoVenda || !dataValidade || !quantidadeEstoque || !nomeFabricante) {
         let html= `  
            <html lang="pt-br">
                <head>
                    <meta charset = "UTF-8">
                    <title>Formulário de Produtos</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
                </head>
                <body> 
                    <div class = "container mt-5"> 
                        <form method="POST" action="/produtos" class="row g-3">        
                                <legend><h3>
                                    Cadastro de Produtos:</h3>
                                </legend>

                             <div class="col-md-6">
                                <label for="inputCodigoBarras" class="form-label">Código de Barras</label>
                                <input type="text" class="form-control" id="codigoBarras" name="codigoBarras" value="${codigoBarras}">`;
                   
                                if(!codigoBarras){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira os dados do Código de Barras!
                                            </div>`;
                                }
                                html+= `
                            </div>

                             <div class="col-md-6">
                                <label for="inputdescricaoProduto" class="form-label">Descrição Produto</label>
                                <input type="text" class="form-control" id="descricaoProduto" name="descricaoProduto" value="${descricaoProduto}">`;
                            
                                if(!descricaoProduto){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira a descrição do produto!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputprecoCusto" class="form-label">Preço de Custo</label>
                                <input type="number" class="form-control" id="precoCusto" name="precoCusto" value="${precoCusto}">`;

                                 if(!precoCusto){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o preço de custo!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                             <div class="col-md-6">
                                <label for="inputprecoVenda" class="form-label">Preço de Venda</label>
                                <input type="number" class="form-control" id="precoVenda" name="precoVenda" value="${precoVenda}">`;

                                 if(!precoVenda){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o preço de venda!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                            <div class="col-md-6">
                                <label for="inputdataValidade" class="form-label">Data Validade</label>
                                <input type="text" class="form-control" id="dataValidade" name="dataValidade" value="${dataValidade}">`;

                                if(!dataValidade){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira a data de validade!
                                            </div>`;
                                } 
                                html+=`
                             </div>

                            <div class="col-md-6">
                                <label for="inputquantidadeEstoque" class="form-label">Quantidade Estoque</label>
                                <input type="text" class="form-control" id="quantidadeEstoque" name="quantidadeEstoque" value="${quantidadeEstoque}">`;
                                
                                 if(!quantidadeEstoque){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira a quantidade de estoque!
                                            </div>`;
                                } 
                                html+=`
                            </div>

                        <div class="col-md-6">
                            <label for="inputnomeFabricante" class="form-label">Nome Fabricante</label>
                            <input type="text" class="form-control" id="nomeFabricante" name="nomeFabricante" value="${nomeFabricante}">`;
                            
                            if(!nomeFabricante){
                                    html+= `<div class="alert alert-danger" role="alert">
                                                Por Favor, insira o nome do fabricante!
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
            listaprodutos.push(
                    {
                       "codigoBarras":codigoBarras,
                        "descricaoProduto":descricaoProduto,
                        "precoCusto":precoCusto,
                        "precoVenda":precoVenda,
                        "dataValidade":dataValidade,
                        "quantidadeEstoque":quantidadeEstoque,
                        "nomeFabricante":nomeFabricante,
                      
                    }
             );
            resposta.redirect("/listaprodutos");     
     }
    
});
app.get("/listaprodutos", estaAutenticado,(requisicao, resposta) => {
    resposta.write(`
         <html lang="pt-br">
            <head>
                <meta charset = "UTF-8">
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>
                <div class = "container mt-5"> 
                    <table class="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Código de Barras</th>
                                <th scope="col">Descrição do Produto</th>
                                <th scope="col">Preço de Custo</th>
                                <th scope="col">Preço de Venda</th>
                                <th scope="col">Data de Validade</th>
                                <th scope="col">Quantidade de Estoque</th>
                                <th scope="col">Nome do Fabricante</th>
                                
                            </tr>
                        </thead>
                        <tbody> `);
                            for(let i=0;i<listaprodutos.length;i++){
                                const produtos =listaprodutos[i];
                                resposta.write(`
                                    <tr>
                                        <td>${i+1}</td>
                                        <td>${produtos.codigoBarras}</td>
                                        <td>${produtos.descricaoProduto}</td>
                                        <td>${produtos.precoCusto}</td>
                                        <td>${produtos.precoVenda}</td>
                                        <td>${produtos.dataValidade}</td>
                                        <td>${produtos.quantidadeEstoque}</td>
                                        <td>${produtos.nomeFabricante}</td>
                                        
                                    </tr>`)
                            }
                        resposta.write(`    </tbody>
                                        </table>
                                        <a href="/produtos" class="btn btn-primary">Adicionar Produto</a>
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
        resposta.cookie("ultimoAcesso", dataUltimoAcesso.toLocaleString(),{maxAge:1000 * 60 * 60 * 24 * 30,httpOnly:true});
        resposta.redirect("/");
    }
    else{
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
