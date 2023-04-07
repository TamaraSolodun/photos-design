const imageContainer = document.getElementById("image-container");
let currentPage = 1;
const limit = 9;
let isLoading = false;

const toggleButton = document.getElementById('toggle-btn');
const body = document.body;

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark');
});

// Функція для отримання картинок з API
async function getImages() {
  isLoading = true;
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`
  );
  const data = await response.json();
  isLoading = false;
  return data;
}

// Функція для додавання картинок до сторінки
function displayCards(images) {
  images.forEach((image) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                <img src=${image.download_url} class="card-img-top" width="356" height="200" alt=${
      image.author
    }>
                <div class="card-body">
                    <h5 class="card-title fw-bold">Heading</h5>
                    <p class="card-text">${getRandomText()}</p>
                    <button href="#" class="btn show-more-btn p-0 fw-bold" >Show more..</button>
                </div>
                <div class="card-footer">
                  <a href="#" class="btn btn-primary me-3 fw-bold">Save to collection</a>
                  <a href="#" class="btn btn-outline-primary fw-bold">Share</a>
                </div>`;
    imageContainer.appendChild(card);

    const cardBody = card.querySelector(".card-body");
    const cardContent = card.querySelector(".card-text");

    const lineHeight = parseInt(getComputedStyle(cardContent).lineHeight);
    const cardContentHeight = cardContent.scrollHeight;
    const maxTextHeight = lineHeight * 2; 
    const showMoreBtn = card.querySelector(".show-more-btn");

    if (cardContentHeight > maxTextHeight) {
      showMoreBtn.style.display = "block";

      showMoreBtn.addEventListener("click", () => {
        cardBody.classList.toggle("expanded");
        console.log("expand");
        if (cardBody.classList.contains("expanded")) {
          showMoreBtn.textContent = "Show Less";
        } else {
          showMoreBtn.textContent = "Show More..";
        }
      });
    } else {
      cardBody.classList.add("expanded");
      showMoreBtn.style.display = "none";
    }
  });
}


// Функція, яка викликається, коли користувач прокручує до кінця сторінки
window.addEventListener("scroll", async function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Перевірка, чи користувач дійшов до кінця сторінки та чи дані вже завантажуються
  if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
    currentPage++;
    const images = await getImages();
    displayCards(images);
  }
});

getImages().then((images) => displayCards(images));

const words = [
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "Ut",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "Duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
];

// Функція для генерації випадкових речень
function getRandomSentence() {
  const length = Math.floor(Math.random() * 10) + 1;
  let sentence = "";
  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * words.length);
    const word = words[index];
    sentence += `${word} `;
  }
  return sentence.trim() + ".";
}

function getRandomText() {
  const length = Math.floor(Math.random() * 9) + 2;
  let text = "";
  for (let i = 0; i < length; i++) {
    const sentence = getRandomSentence();
    text += `${sentence} `;
  }
  return text.trim();
}


