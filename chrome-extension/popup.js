document
  .getElementById("searchButton")
  .addEventListener("click", async function () {
    let query = document.getElementById("search").value;
    const response = await fetch(
      `http://localhost:3000/snippets/search?q=${query}`
    );
    const results = await response.json();
    // Display search results (you can customize the display according to your needs)
  });
