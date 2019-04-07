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
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;


var map = document.querySelector('.map'); //  Карта объявления
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset'); // Поля добавления объявления
var mainPin = document.querySelector('.map__pin--main'); //  Главная метка
var formAddress = document.querySelector('#address');


//  Функция генерации целого числа
var generateNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//  Функция генерирует уникальный аватар
var generateAvatar = function (generatedAdverts) {
  var avatarNumber = generateNumber(1, 9);
  var avatar = 'img/avatars/user0' + avatarNumber + '.png';
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

//  Функция отрисовывает метку
var renderMark = function (advert, template) {
  var pin = template.cloneNode(true);
  var img = pin.querySelector('img');

  pin.style.left = advert.location.x + 'px';
  pin.style.top = advert.location.y + 'px';
  img.src = advert.author.avatar;
  img.alt = advert.offer.title;
  return pin;
};

// Функция указывает реальные координаты с учетом ширины элемента
var countRealLocation = function (pin) {
  pin.style.left = parseInt(pin.style.left, 10) - Math.round((pin.offsetWidth / 2)) + 'px';
  pin.style.top = parseInt(pin.style.top, 10) - pin.offsetHeight + 'px';
  return pin;
};

//  Функция отрисовывает фото
var renderPhotosList = function (advert, photos) {
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }
  for (var j = 0; j < advert.offer.photos.length; j++) {
    var photo = document.createElement('img');
    photo.src = advert.offer.photos[j];
    photo.classList.add('popup__photo');
    photo.style.width = '45px';
    photo.style.height = '40px';
    photo.alt = 'Фотография жилья';
    photos.appendChild(photo);
  }
  return photos;
};

//  Функция отрисовывает фичи
var renderFeatures = function (advert, features) {
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  for (var i = 0; i < advert.offer.features.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + advert.offer.features[i]);
    features.appendChild(feature);
  }
  return features;
};
//  Функция отрисовывает подробное объявление
var rendeAdvertCard = function (advert, template) {
  var mapCard = template.cloneNode(true);
  mapCard.querySelector('.popup__title').textContent = advert.offer.title;
  mapCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  mapCard.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  var type;
  switch (advert.offer.type) {
    case 'flat':
      type = 'Квартира';
      break;

    case 'bungalo':
      type = 'Бунгало';
      break;

    case 'house':
      type = 'Дом';
      break;

    case 'palace':
      type = 'Дворец';
      break;
  }
  mapCard.querySelector('.popup__type').textContent = type;

  mapCard.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;


  var features = mapCard.querySelector('.popup__features');
  renderFeatures(advert, features);

  mapCard.querySelector('.popup__description').textContent = advert.offer.description;

  var photos = mapCard.querySelector('.popup__photos');
  renderPhotosList(advert, photos);

  mapCard.querySelector('.popup__avatar').src = advert.author.avatar;

  return mapCard;
};

//  Функция дизейблит поля формы объявления
var disableNotice = function () {
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

//  Функция раздизейблит поля формы объявления
var enableNotice = function () {
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adFieldsets.length; i++) {
    adFieldsets[i].removeAttribute('disabled', 'disabled');
  }
};

//  Функция выполняет полный цикл гегерации и отрисовки объявлений
var showAdverts = function () {
  var adverts = generateRandomAdverts(8);
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    var renderedPin = renderMark(adverts[i], pinTemplate);
    fragment.appendChild(renderedPin);
  }
  mapPins.appendChild(fragment);

  var pins = document.querySelectorAll('.map__pin');
  for (var j = 0; j < pins.length; j++) {
    fragment.appendChild(countRealLocation(pins[j]));
  }
  mapPins.appendChild(fragment);
};

//  Функция передает значение полю Адрес в форме заполнения объявления, относительно от координат главного маркера (неактивное состояние)
var setInActiveFormAddress = function () {
  formAddress.value = (parseInt(mainPin.style.left, 10) + Math.round(MAIN_PIN_WIDTH / 2) + 'px') + ' '
                      + (parseInt(mainPin.style.top, 10) + Math.round(MAIN_PIN_HEIGHT / 2) + 'px');
};

//  Функция передает значение полю Адрес в форме заполнения объявления, относительно от координат главного маркера (активное состояние)
var setActiveFormAddress = function () {
  formAddress.value = mainPin.style.left + ' ' + mainPin.style.top;
};

//  Начало работы

//  На этапе загрузки стрвницы - Букинг должен быть неактивен. Дизейблим форму создания объявления
disableNotice();

//  Значение поля адрес должно быть заполнено всегда, даже если букинг неактивен
setInActiveFormAddress();

//  При отпускание главного маркера - отрисовываем метки объвлений на карте, а также убираем дизейбл формы создания объявлений
mainPin.addEventListener('mouseup', function () {
  showAdverts();
  enableNotice();
  map.classList.remove('map--faded');
  setActiveFormAddress();
});


// Step 5 - Отрисовываем объявление первой метки
/*
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');
map.insertBefore(rendeAdvertCard(adverts[0], cardTemplate), filtersContainer);*/


