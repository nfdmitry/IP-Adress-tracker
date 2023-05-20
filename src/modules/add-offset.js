//Адаптация отображения карты на маленьких экранах мобильных устройств (сдвиг карты вниз для корректного отображения маркера на экране)
export function addOffset(map) {
    const offsetY = map.getSize().y * 0.08;
    map.panBy([0, -offsetY], {animate: false});
};