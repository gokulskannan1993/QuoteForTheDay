// fetch data from html
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const refreshBtn = document.getElementById('refresh');
const loader = document.getElementById('loader');


// to show loading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


//to hide loading
function hideLoadingSpinner(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Fetching quote from api
async function getQuote(){

    // show loader
    showLoadingSpinner();

    //custom proxy url to avoid error
    const proxyUrl = 'https://mighty-ridge-16563.herokuapp.com/';

    // url of the api
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response  = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //replacing values with data

        // if author field from the api is blank replace it with "Unknown"
        if(data.quoteAuthor === ""){
            authorText.innerText = "Unknown";
        }else{
            authorText.innerText = data.quoteAuthor;
        }

        // Decrease the size of fonts for longer quotes
        if(data.quoteText.length.length>120){
            quoteText.classList.add("long-quote");
        }else{
            quoteText.classList.remove("long-quote");
        }


        quoteText.innerText = data.quoteText;

        //stop loader and show quote
        hideLoadingSpinner();

    }catch(error){
        getQuote();
        console.log("Whoops, Fetching failed!",error);
    }
}

//On Load
getQuote();