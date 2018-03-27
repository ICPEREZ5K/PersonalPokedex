let apiBase = "https://pokeapi.co/api/v2/pokemon/";
let searchOffset = 0;

function getPokeData(endpoint, done) {
    $.ajax({url: endpoint , success: done});
}

function fillSearchArea(data){
    
    if($('.result').length > 1){
       
        $('.result').remove();
        
        for(let i = 0; i < data.results.length; i++){
            $('#search-results').append(`<p class="result">${data.results[i].name}</p>`);
       
        } 
        
    } else {
        searchOffset = 0;
        for(let i = 0; i < data.results.length; i++){
            $('#search-results').append(`<p class="result">${data.results[i].name}</p>`);
        }
    }
}

function addOffset(){
    getPokeData(`${apiBase}${'?offset='}${searchOffset += 20}`, fillSearchArea);
};

function removeOffset(){
    getPokeData(`${apiBase}${'?offset='}${searchOffset -= 20}`, fillSearchArea);
};


$('#offsetNext').click(addOffset);
$('#offsetPrev').click(removeOffset);

getPokeData(apiBase, fillSearchArea);