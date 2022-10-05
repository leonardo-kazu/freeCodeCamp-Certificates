/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
let quotesData 

const getQuotes = () => {
    return $.ajax( {
        headers: {
            Accept: 'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function(jsonQuotes) {
            if (typeof jsonQuotes === "string") {
                quotesData = JSON.parse(jsonQuotes);
                console.log(quotesData);
            } 
        }
    })
}

const randomQuote = () => {
    return quotesData.quotes[Math.floor(Math.random() * quotesData.quotes.length)];
}

const getQuote = () => {
    let quoter = randomQuote();

    let content = quoter.quote;
    let author = quoter.author;

    $("#tweet-quote").attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + content + '" ' + author)
    );

    $("#quote").text('"'+ content+'"');
    $("#author").text(author);
}

$(document).ready(function() {
    getQuotes().then(() => {
        getQuote();
    })
});

$("#new-quote").click(getQuote)