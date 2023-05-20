import L from 'leaflet';

// Отрисовка карты (библиотека leaflet)
export function addTileLayer(map) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://nfdmitry.github.io/IP-Adress-tracker/">Dmitry Nefedov</a>.'
    }).addTo(map);
};
