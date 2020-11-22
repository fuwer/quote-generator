const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete(){
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
async function getQuote() {
    loading();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
    try {
        const responce = await fetch (apiUrl);
        const data = await responce.json();
        // if Author is blank, add 'Unknown'
        if (data.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.author
        }
        //Reduce font size for long quotes
        if (data.quote.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quote
        //Stop Loader, Stop Quote
        complete();
    } catch (error) {
        console.log ("OOOPS");
        if (error >= 5) {
            alert("Something went wrong")
        } else{
            getQuote();
        }
    }
}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load Tasks
getQuote();