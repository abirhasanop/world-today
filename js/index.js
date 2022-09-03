const loadCategory = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayNewsCategory(data.data.news_category));
};

const displayNewsCategory = (newsCategories) => {
  //   console.log(newsCategories);
  const categoryContainer = document.getElementById("category-container");
  newsCategories.forEach((newsCategory) => {
    // console.log(newsCategory);
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
    .then((data) => displayNews(data.data));
};

const displayNews = (allNews) => {
  // console.log(allNews);
  const allNewsContainer = document.getElementById("news-container");
  allNewsContainer.textContent = "";
  allNews.forEach((news) => {
    console.log(news);
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
                                content. This content is a little bit longer.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <img  style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img}" alt="">
                                   <h6>${news.author.name}</h6>
                                </div>
                                <h5>${news.total_view} <i class="fa-sharp fa-solid fa-eye"></i></h5>
                                <div>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <div><i class="fa-sharp fa-solid fa-arrow-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    allNewsContainer.appendChild(newsDiv);
  });
};

loadCategory();
