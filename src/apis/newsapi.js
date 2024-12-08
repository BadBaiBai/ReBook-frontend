import httpInstance from "@/utils/http";

export function getNewsInfo(city) {
    return httpInstance({
        url: 'https://apis.tianapi.com/topnews/index',
        method: 'get',
        params: {
            key: 'a53548ad0ad5d0569b4d0100ac99616c',
            word: city,
        }
    });
}
