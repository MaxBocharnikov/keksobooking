'use strict';
var ROOMS_MIN = 1;
var ROOMS_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 20;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ADDRES_X_INT_MIN = 100;
var ADDRES_X_INT_MAX = 500;
var ADDRES_Y_INT_MIN = 130;
var ADDRES_Y_INT_MAX = 630;


//  Функция генерации целого числа
var generateNumber = function (min , max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//  Функция генерирует уникальный аватар
var generateAvatar = function (generatedAdverts) {
  var avatarNumber = generateNumber(1, 9);
  var avatar = 'img/avatars/user' + avatarNumber + '.png';
  if (generatedAdverts.length > 0) {
    for (var i = 0; i < generatedAdverts.length; i++) {
      if (avatar === generatedAdverts[i].author.avatar) {
        avatar = generateAvatar(generatedAdverts);
      }
    }
  }
  return avatar;
};

//  Функция генерирует уникальный заголовок
var generateTitle = function (generatedAdverts) {
  var titles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var generatedIndex = generateNumber(0, titles.length);
  var title = titles[generatedIndex];

  if (generatedAdverts.length > 0) {
    for (var i = 0; i < generatedAdverts.length; i++) {
      if (title === generatedAdverts[i].offer.title) {
        title = generateTitle(generatedAdverts);
      }
    }
  }
  return title;
};

//  Генерация адреса
var generateAddress = function () {
  var x = generateNumber(ADDRES_X_INT_MIN, ADDRES_X_INT_MAX + 1);
  var y = generateNumber(ADDRES_Y_INT_MIN, ADDRES_Y_INT_MAX + 1);

  return x.toString() + ', ' + y.toString();
};

//  Генерация цены
var generatePrice = function () {
  return generateNumber(PRICE_MIN, PRICE_MAX + 1);
};

//  Генерация типа здания
var generateType = function () {
  var types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var index = generateNumber(0, types.length);
  return types[index];
};

//  Генерация комнат
var generateRoom = function () {
  return generateNumber(ROOMS_MIN, ROOMS_MAX + 1);
};

// Генерация кол-ва гостей
var generateGuestQuantity = function () {
  return generateNumber(GUESTS_MIN, GUESTS_MAX + 1);
};

// Генерация checkin - checkout
var generateInOut = function () {
  var times = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var index = generateNumber(0, times.length);
  return times[index];
};

//  Генерирует фичи (массив случайной длины)
var generateFeatures = function () {
  var allFeatures = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var features = [];
  var featuresQuantity = generateNumber(0, allFeatures.length);
  for (var i = 0; i < featuresQuantity; i++) {
    var index = generateNumber(0, allFeatures.length);
    features.push(allFeatures[index]);
    allFeatures.splice(index, 1);
  }
  return features;
};

// Генерация располржения фотографий
var generatePhotos = function () {
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  for (var i = 0; i < photos.length; i++) {
    var index = generateNumber(0, photos.length);
    var temp = photos[i];
    photos[i] = photos[index];
    photos[index] = temp;
  }

  return photos;
};

//  Функция генерирует случайное объясвление
var generateAdvert = function (generatedAdverts) {
  var advert = {};

  var avatar = generateAvatar(generatedAdverts);
  var title = generateTitle(generatedAdverts);
  var address = generateAddress();
  var price = generatePrice();
  var type = generateType();
  var rooms = generateRoom();
  var guests = generateGuestQuantity();
  var checkin = generateInOut();
  var checkout = generateInOut();
  var features = generateFeatures();
  var description = '';
  var photos = generatePhotos();
  var x = generateNumber(ADDRES_X_INT_MIN, ADDRES_X_INT_MAX + 1);
  var y = generateNumber(ADDRES_X_INT_MIN, ADDRES_X_INT_MAX + 1);
  advert.author = {};
  advert.offer = {};
  advert.location = {};

  advert.author.avatar = avatar;
  advert.offer.title = title;
  advert.offer.address = address;
  advert.offer.price = price;
  advert.offer.type = type;
  advert.offer.rooms = rooms;
  advert.offer.guests = guests;
  advert.offer.checkin = checkin;
  advert.offer.checkout = checkout;
  advert.offer.features = features;
  advert.offer.description = description;
  advert.offer.photos = photos;
  advert.location.x = x;
  advert.location.y = y;

  return advert;
};

//  Функция генерирует случайные уникальные объявления
var generateRandomAdverts = function (quantity) {
  var randomAdverts = [];
  for (var i = 0; i < quantity; i++) {
    randomAdverts.push(generateAdvert(randomAdverts));
  }
  return randomAdverts;
};


console.log(generateRandomAdverts(8));
