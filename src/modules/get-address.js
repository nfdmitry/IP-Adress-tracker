//Async logic
//Запрос IP устройства пользователя
export async function getAddressUser() {
    try {
        const response = await fetch('https://ipwho.is/');
        return await response.json();
    } catch (error) {
        alert(error);
    };
};

//Запрос информации о введенном IP
export async function getAddress(ipAddress) {
    try {
        const response = await fetch(`https://ipwho.is/${ipAddress}`);
        return await response.json();
    } catch (error) {
        alert(error);
    };
};
