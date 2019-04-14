'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card'); //  Шаблон отрисовки карточки объявления
  var filtersContainer = document.querySelector('.map__filters-container'); //  фильтры на карте

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

  //  Функция удаляет текущую карточку метки
  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  //  Функция закрывает popup по нажатию на крестик
  var popupCloseHandler = function () {
    var popupClose = document.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      removeMapCard();
    });

  };

  //  По нажатию на esc закрываем карточку метки
  var onPopupEscPress = function (evt) {
    if (window.isEscClicked(evt.keyCode)) {
      removeMapCard();
    }
  };


  //  Функция отрисовывает карточку объявления
  window.pinCartClickHandler = function (advert, pin) {
    pin.addEventListener('click', function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) { //  Проверяем, существует ли на странице отрисованная карточка; если да - удаляем ее
        mapCard.remove();
      }
      window.map.insertBefore(rendeAdvertCard(advert, cardTemplate), filtersContainer);
      popupCloseHandler();
      document.addEventListener('keydown', onPopupEscPress);
    });
  };
})();
