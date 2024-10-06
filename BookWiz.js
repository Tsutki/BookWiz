
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const bookContainer = document.querySelector("#book-container");

const API_URL = "https://www.googleapis.com/books/v1/volumes?q=";

async function fetchBooks(query) {
    try {
        const response = await fetch(`${API_URL}${query}`);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
}

async function fetchTrendingBooks() {
    const trendingQuery = "bestsellers";
    return await fetchBooks(trendingQuery);
}

function displayBooks(books) {
    bookContainer.innerHTML = "";

    if (!books || books.length === 0) {
        bookContainer.innerHTML = `<p>No books found. Please try a different search.</p>`;
        return;
    }

    books.forEach((book) => {
        const { title, authors, imageLinks, categories } = book.volumeInfo;
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${imageLinks?.thumbnail || 'book-cover-placeholder.jpg'}" alt="${title} Cover">
            <h3>${title}</h3>
            <p>Author: ${authors?.join(", ") || "Unknown"}</p>
            <p>Genre: ${categories?.[0] || "Unknown"}</p>
        `;

        bookContainer.appendChild(bookCard);
    });
}

searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.trim();

    if (query) {
        const books = await fetchBooks(query);
        displayBooks(books);                                       
    } else {
        alert("Please enter a search query!");
    }
});

searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();

        if (query) {
            const books = await fetchBooks(query);
            displayBooks(books);
        } else {
            alert("Please enter a search query!");
        }
    }
});

window.addEventListener("load", async () => {
    const trendingBooks = await fetchTrendingBooks();
    displayBooks(trendingBooks);
});
