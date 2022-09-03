const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data.news_category));
};

const displayNewsCategory = (newsCategories) => {
  //   console.log(newsCategories);
  newsCategories.forEach((newsCategory) => {
    // console.log(newsCategory);
    const categoryContainer = document.getElementById("category-container");
    const li = document.createElement("li");
    li.innerHTML = `
    <li class="nav-item mx-4">
        <a onclick="loadNews('${newsCategory.category_id}');" class="nav-link fs-6" href="#">${newsCategory.category_name}</a>
    </li>
    `;
    categoryContainer.appendChild(li);
  });
};

const loadNews = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};

loadCategory();
