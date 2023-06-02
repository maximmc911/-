
 // ! Настройки свайпера!

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
   autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
});
 
 // ! Создание массива со временем и картинками

const UserCard = [];
const img = [];
const dataUser = [];
function makeImage() {
  const imgName = `./images/face-0.jpg`;
  let indexImg = 0;
  for (let index = 0; index < imgName.length; index++) {
      if (imgName[index]== `0`) {
          indexImg = index;
      };
  };
  for (let index = 0; index < 10; index++) {
    let imgMake = imgName.slice(0 , indexImg) + index + imgName.slice(indexImg+1);
    img.push(imgMake);
  };
  
};

function makeTime() {
  for (let index = 0; index < 10; index++) {
    function Rand(min , max) {
     return Math.floor(Math.random()*(max - min)+min)
    };
    let Y = Rand(2000 ,2022);
    let M = Rand(0 ,11);
    let D = Rand(0 ,29);
    let H = Rand(1 , 23);
    let min = Rand(1 ,59);
      dataUser.push(new Date(Y , M , D, H , min))
  };
};
function makeUserCard() {
  makeImage();
  makeTime();
 for (const iterator in img) {
  UserCard.push({
    photo: img[iterator],
    time: dataUser[iterator],
  })
 };
  
};

makeUserCard();
console.log(dataUser);
;

       // ! Создание карточек

const parentDiv = document.querySelector(`.swiper-wrapper`);



              // ! Получение данных пользователей с сервера

const User_URL = `https://jsonplaceholder.typicode.com/users`;
const req = fetch(User_URL)

// Конвертация полученного промиса
.then((res) => res.json())
.then((picture) => {

  // Создание окончательной карточки пользователя
const Cards = [];
for (const key in picture) {
  Cards.push({
    name: picture[key].name,
    photo: UserCard[key].photo,
    time: UserCard[key].time,
    email: picture[key].email,
  })
};


// Создание карточек в слайдере
 
 const CreateCard = (Cards, parentDiv) => {
console.log(Cards);
    parentDiv.innerHTML = Cards.map((people) =>

      ` <div class="swiper-slide swaper">
      <div class="header">
      <img src="${people.photo}" alt="" class="img">
      </div>
      <div class="body">
      <h1 class="Name">${people.name}</h1>
      <h2 class="email">${people.email}</h2>
      <p class="time">${people.time}</p>
      </div>
        </div>
      `
      ).join(``);
 }

CreateCard(Cards, parentDiv);
})





