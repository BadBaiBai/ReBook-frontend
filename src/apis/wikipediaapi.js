import httpInstance from "@/utils/http";

export function getWikipediaInfo(city) {
    return httpInstance({
        url: 'https://zh.wikipedia.org/w/api.php',
        method: 'get',
        params: {
            format: 'json',
            action: 'query',
            titles: city,
            prop: 'extracts',
            origin: '*',
        }
    });
}