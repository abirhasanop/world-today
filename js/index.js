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
    // console.log(news);
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
                            <p class="card-text">${news.details}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <img  style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img}" alt="">
                                   <div class="d-flex flex-column justify-content-center mt-3 ms-2">
                                   <h6>${news.author.name}</h6>
                                   <p>10/5/2022</p>
                                   </div>
                                </div>
                                <h5>${news.total_view} <i class="fa-sharp fa-solid fa-eye"></i></h5>
                                <div>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <a onclick="loadModal('${news._id}')" class="text-primary" data-bs-toggle="modal" data-bs-target="#newsModal"><i class="fa-sharp fa-solid fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    allNewsContainer.appendChild(newsDiv);
  });
};

const loadModal = (newsId) => {
  fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then((res) => res.json())
    .then((data) => displayModal(data.data[0]));
};

const displayModal = (news) => {
  console.log(news);
  const modalTitle = document.getElementById("newsModalLabel");
  modalTitle.innerText = news.title;

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <h6>Author: ${news.author.name}</h6>
  <p>Published: ${news.author.published_date}</p>
  <h6>Total Views: ${news.total_view}</h6>
  <h6>Rating: ${news.rating.number}</h6>
  <h6>Badge: ${news.rating.badge}</h6>
  `;
};

loadCategory();
