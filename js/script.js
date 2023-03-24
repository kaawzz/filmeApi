let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");
let listaFilmes = document.querySelector("#lista-filmes");

btnBuscarFilme.onclick = () => {
    if(inputBuscarFilme.value.length > 0){
        console.log(inputBuscarFilme.value);
    }
    return false;
}

btnBuscarFilme.onclick = () => {
    if(inputBuscarFilme.value.length > 0){
        fetch("http://www.omdbapi.com/?apikey=f6cacea2&s="+inputBuscarFilme.value, {mode:"cors"})
        .then((resp)=> resp.json())
        .then((resp)=> {
            console.log(resp);
        })
    }
    return false;
}

btnBuscarFilme.onclick = async () => {
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
    let listarFilmes = await document.querySelector("#lista-filmes");
    listaFilmes.style.display = "flex";
    listarFilmes.innerHTML = "";
    document.querySelector("#mostrar-filme").innerHTML = "";
    document.querySelector("#mostrar-filme").style.display = "none";
    console.log(listaFilmes);
    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            console.log(filme);
            listarFilmes.appendChild(await filme.getCard());
            filme.getBtnDetalhes().onclick = () =>{
                btnDetalhesFilme(filme.id);
            }
        });
    }
}

//parte 3

let btnDetalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=f6cacea2&s="+id)
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
        document.querySelector("#mostrar-filme").appendChild(filme.getDetalhesFilme());
        document.querySelector("#lista-filmes").style.display = "none";
        document.querySelector("#mostrar-filmes").style.display = "flex";
        
    });

}