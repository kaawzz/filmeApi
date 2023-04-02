let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

btnBuscarFilme.onclick =  async() => {
    if(inputBuscarFilme.value.length > 0){
        let filmes = new Array();
        fetch("http://www.omdbapi.com/?apikey=f6cacea2&s="+inputBuscarFilme.value)
        .then((resp)=> resp.json())
        .then((resp)=> {
            resp.Search.forEach((item)=>{
                console.log(item);
                let filme = new Filme(
                    item.imdbID,
                    item.Title,
                    item.Year,
                    null,
                    null,
                    item.Poster,
                    null,
                    null,
                    null,
                    null,
                    null
                );
                filmes.push(filme);
            });
            listarFilmes(filmes);
        })
    }
    return false;
}

let listarFilmes = async (filmes) => {
    let listaFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.style.display = "flex";
    listaFilmes.innerHTML = "";
    document.querySelector("#mostrar-filme").innerHTML = "";
    document.querySelector("#mostrar-filme").style.display = "none";
    console.log(listaFilmes);
    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            console.log(filme);
            listaFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick = () =>{
                detalhesFilme(filme.id);
            }
        });
    }
}

let detalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=f6cacea2&i="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        console.log(resp);
        let filme = new Filme(
            resp.imbID,
            resp.Title,
            resp.Year,
            resp.Genre.split(","),
            resp.Runtime,
            resp.Poster,
            resp.Plot,
            resp.Director,
            resp.Actors.split(","),
            resp.Awards,
            resp.imbRating
        )

        console.log(filme);
        document.querySelector("#mostrar-filme").appendChild(filme.getDetalhesFilme());

        document.querySelector("#btnFechar").onclick = () =>{
        document.querySelector("#lista-filmes").style.display = "flex";
        document.querySelector("#mostrar-filme").innerHTML = "";
        document.querySelector("#mostrar-filme").style.display = "none";
        }
       
        document.querySelector("#lista-filmes").style.display = "none";
        document.querySelector("#mostrar-filme").style.display = "flex";
    });

}

let salvarFilme = (filme) =>{
    let filmesString = localStorage.getItem('filmesFavoritos');
    let filmes = JSON.parse(filmesString);

    filmes.push(filme);

    filmes = JSON.stringify(filmes);
    localStorage.setItem('filmesFavoritos', filmes);
}

let listarFavoritos = () => {
let filmesFavoritos = localStorage.getItem('filmesFavoritos');
filmesFavoritos = JSON.parse(filmesFavoritos);

  let filmesArray = new Array();
  let filmes = [];
  filmesFavoritos.forEach((item) =>{
    let filme = new Filme(
        item.id,
        item.titulo,
        item.ano,
        item.genero,
        item.duracao,
        item.cartaz,
        item.direcao,
        item.elenco,
        item.classificacao,
        item.avaliacao
    );
    filmes.push(filme);
  });
  return filmesArray;
}