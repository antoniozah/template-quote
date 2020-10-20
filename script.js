const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new__quote');
const loader = document.getElementById('loader');


//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}


// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}


let apiQuotes = [];

//Show New Quote

function newQuote() {
  loading();
  //Pick random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  //Check if author is blank and replace with Unknown
  if(!quote.author){
    authorText.textContent = 'Unknown';
  }else{
    authorText.textContent = quote.author;
  }

  //Check Quote lenght and put long__quote

  if(quote.text.length > 100){
    quoteText.classList.add('long__quote')
  }else{
    quoteText.classList.remove('long__quote');
  }

  //Set quote , Hide Loader
  
  quoteText.textContent = quote.text;
  complete();
}

// Get Quote from API
async function getQuotes() {
  loading();
  const apiUrl = 'https://type.fit/api/quotes'
  try{
    const response = await fetch(apiUrl)
    apiQuotes = await response.json();
    newQuote();
  }catch (error){
    getQuotes();
    console.log('ahhhhhh, no quote', error);
  }
}

//Tweet Quote

function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  //open a new window for twitter
  window.open(twitterUrl, '_blank');
}

//Event Listeners for buttons 

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//onLoad
getQuotes();
