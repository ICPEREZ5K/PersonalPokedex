let apiBase = "https://pokeapi.co/api/v2/pokemon/";
let searchOffset = 0;
let pokemon = {};

function getPokeData(endpoint, done) {
    $.ajax({url: endpoint , success: done});
    console.log('ajax request(s)');
}

function PokemonObj(hp, attack, defense, abilities){
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.abilities = abilities;
}
function createPokemon(data){ 
    pokemon[`${data.name}`] = new PokemonObj(  
        data.stats[5].base_stat,
        data.stats[4].base_stat,
        data.stats[3].base_stat,
        data.abilities
    )
    console.log(`one pokemon ${data.name} added to hash`);
};

function show(){
    
}

function checkPokeHash(comparison){
    
    if(pokemon[`${comparison}`] !== undefined){
         console.log(pokemon[`${comparison}`]);
    } else {
        alert(`Data for ${comparison} could not be found inside the local hash. Press OK to download from https://pokeapi.co`);
        getPokeData(`https://pokeapi.co/api/v2/pokemon/${comparison}`, createPokemon);
    } 
}
function activate(){
    event.preventDefault();
    if($('.result').hasClass('active-result')){
        $('.result').removeClass("active-result");
        $(this).addClass("active-result");
        checkPokeHash($(this).text()); 
    }
    else{
        $(this).addClass("active-result");
        checkPokeHash($(this).text());
    }   
}

function fillSearchArea(data){    
    if($('.result').length > 1){        
        $('.result').remove();
        for(let i = 0; i < data.results.length; i++){
            $('#search-results').append(`<p class="result">${data.results[i].name}</p>`);
        } 
    } 
    else {
        for(let i = 0; i < data.results.length; i++){
            $('#search-results').append(`<p class="result">${data.results[i].name}</p>`);
        }
    }
    
    $('.result').on("click", activate);
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