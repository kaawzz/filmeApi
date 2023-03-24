let inputBuscarFilme = document.querySelector("#input-buscar-filme");
let btnBuscarFilme = document.querySelector("#btn-buscar-filme");

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

getCard = async () => {
    let card = document.createElement("div");
    card.setAttribute("class","card");
    let imgCartaz = document.createElement("img");
    imgCartaz.setAttribute("class","card-img-topz");
    imgCartaz.setAttribute("src",this.cartaz);
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class","card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.setAttribute("class","card-title");
    let divDetalhes = document.createElement("div");
    divDetalhes.setAttribute("style","display:flex; justify-content:space-aroud;");
    let divGenero = document.createElement("div");
    divGenero.setAttribute("style","flex-grow:1;");
    let divAnoProducao = document.createElement("div");
    divAnoProducao.setAttribute("style","flex-grow:1");
    let divClassificacao = document.createElement("div");
    divClassificacao.setAttribute("style","flex-grow:1");
    hCardTitle.appendChild(document.createTextNode(this.titulo));
    divGenero.appendChild(document.createTextNode(this.genero));
    divAnoProducao.appendChild(document.createTextNode(this.ano));
    divClassificacao.appendChild(document.createTextNode(this.classificacao));
    divDetalhes.appendChild(divGenero);
    divDetalhes.appendChild(divAnoProducao);
    divDetalhes.appendChild(divClassificacao);
    card.appendChild(imgCartaz);
    card.appendChild(cardBody);
    cardBody.appendChild(hCardTitle);
    cardBody.appendChild(divDetalhes);

    this.setBtnDetalhes();
    cardBody.appendChild(this.getBtnDetalhes());

    return  card;
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
    listarFilmes.innerHTML = "";
    console.log(listaFilmes);
    if(filmes.length > 0) {
        filmes.forEach(async(filme) => {
            listarFilmes.appendChild(await filme.getCard());
        });
    }
}

//parte 3
setBtnDetalhes = () => {
    this.btnDetalhes = document.createElement('button');
    this.btnDetalhes.appendChild(document.createTextNode("Detalhes"));
    this.btnDetalhes.setAttribute("id", this.id);
    this.btnDetalhes.setAttribute("class", "btnDetalhesFilme");
}

getBtnDetalhes=()=>{
    return this.btnDetalhes
}

let btnDetalhesFilme = async (id)=>{
    fetch("http://www.omdbapi.com/?apikey=f6cacea2&s="+id)
    .then((resp)=> resp.json())
    .then((resp)=> {
        
    })

}