import '@babel/polyfill';
import './index.html';
import './index.sass';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {addOffset, addTileLayer, getAddressUser, getAddress, validateIp} from './modules';
import icon from './img/icon-location.svg';

//Globals:
const sendIpButton = document.querySelector('.search-bar__btn');
const inputIp = document.querySelector('.search-bar__input');
const ipInfo = document.getElementById('ip');
const locationInfo = document.getElementById('location');
const timezoneInfo = document.getElementById('timezone');
const ispInfo = document.getElementById('isp');

//Attach events:
sendIpButton.addEventListener('click', handleBtnSendIp);
inputIp.addEventListener('keydown', handleKeyEnter);

//Получение пользовательского IP и передача в качестве введенных данных
document.addEventListener('DOMContentLoaded', () => {
    getAddressUser()
        .then((response) => getAddress(response.ip))
        .then((data) => printInfo(data))
});

//Настройки карт (библиотека leaflet)
const markerIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 40],
});
const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,
});
addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

//Инициализация запроса на сервер:
function init() {
    const ipAddress = inputIp.value;
    if (validateIp(ipAddress)) {
        getAddress(ipAddress)
            .then(printInfo)
    };
};

//Обработка клика по кнопке запроса:
function handleBtnSendIp(event) {
    event.preventDefault();
    init();
};

//Обработка нажатия клавиши Enter
function handleKeyEnter(event) {
    if (event.key === 'Enter') {
        init();
    };
};

//Отрисовка данных в HTML
function printInfo(locationIpAddress) {
    const {ip, latitude, longitude, country, region} = locationIpAddress;
    const {isp} = locationIpAddress.connection;
    const {utc} = locationIpAddress.timezone;
    ipInfo.innerText = ip;
    locationInfo.innerText = country + ' ' + region;
    timezoneInfo.innerText = utc;
    ispInfo.innerText = isp;
    //Передача координат ([широта, долгота]) для смены местоположения на карте
    map.setView([latitude, longitude]);
    //Удаление всех маркеров с карты
    const allMarkers = document.querySelectorAll('.leaflet-marker-icon');
    allMarkers.forEach(el => el.remove());
    // Установка маркера на карте согласно новым координатам
    L.marker([latitude, longitude], {icon: markerIcon}).addTo(map);
    //Адаптация отображения маркера (если стараница открыта на телефоне или планшете)
    if (matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    };
};





