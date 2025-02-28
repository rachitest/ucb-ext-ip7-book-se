const PAGE_SIZE = 10;


// Hint: You can use these for global state variables...
let query = 'the lord of the rings';
let isLoading = false;
let books = [];
let page = 0;
let totalPages = 0;

/*
doFetch will do the fetch to the API based on state, updating the state with
the books retrieved.
*/
function doFetch() {
    const offset = page * PAGE_SIZE;
    const url = `https://openlibrary.org/search.json?q=${query}&limit=${PAGE_SIZE}&offset=${offset}`;
    console.log('making query to ', url);
    isLoading = true;
    render();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('data', data);
            books = data.docs;
            totalPages = Math.ceil(data.numFound / PAGE_SIZE);
            isLoading = false;
            render();
        });
}

function onSearch() {
    query = document.getElementById('search_input').value;
    page = 0; // Reset to the first page on a new search
    doFetch();
}


function decrementPage() {
    if (page > 0) {
        page--;
        doFetch();
    }
}


function incrementPage() {
    if (page < totalPages - 1) {
        page++;
        doFetch();
    }
}

function render() {
    let bookDiv = document.querySelector('#books_div');
    let pagesSpan = document.querySelector('#pages_span');
    pagesSpan.textContent = `${page + 1} / ${totalPages}`;

    if (isLoading) {
        bookDiv.innerHTML = '<div class="loader">Loading...</div>';
    } else {
        bookDiv.innerHTML = ''; // Clear previous results

        if (books.length === 0) {
            bookDiv.innerHTML = "No books found.";
            return;
        }

        for (const book of books) {
            const bookElement = document.createElement('div');
            bookElement.classList.add('Books-book');

            let coverUrl = "https://via.placeholder.com/150"; // Default placeholder
            if (book.cover_i) {
                coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            }

            const imgElement = document.createElement('img');
            imgElement.src = coverUrl;
            imgElement.alt = "cover";
            bookElement.appendChild(imgElement);


            const detailsElement = document.createElement('div');
            detailsElement.classList.add('Books-book-details');

            const titleElement = document.createElement('div');
            titleElement.classList.add('Books-book-title');
            titleElement.textContent = book.title;
            detailsElement.appendChild(titleElement);

            if (book.author_name) {
                const authorElement = document.createElement('strong');
                authorElement.textContent = "Author: ";
                detailsElement.appendChild(authorElement);
                detailsElement.append(`${book.author_name.join(', ')}`);
                detailsElement.appendChild(document.createElement('br'));
            }

            if (book.language) {
                const langElement = document.createElement('strong');
                langElement.textContent = "Language: ";
                detailsElement.appendChild(langElement);
                detailsElement.append(`${book.language.join(',')}`); //Show the languages.
                detailsElement.appendChild(document.createElement('br'));
            }


            if (book.first_publish_year) {
                const yearElement = document.createElement('strong');
                yearElement.textContent = "Year Published: ";
                detailsElement.appendChild(yearElement);
                detailsElement.append(book.first_publish_year);
                detailsElement.appendChild(document.createElement('br'));

            }


            bookElement.appendChild(detailsElement);
            bookDiv.appendChild(bookElement);
        }
    }
}

// Initial fetch on page load
doFetch();