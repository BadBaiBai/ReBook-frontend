import httpInstance from "@/utils/http";

export function getTourInfo(areaCode) {
    return httpInstance({
        url: 'https://eolink.o.apispace.com/24234/lives_geo/v001/suggestion',
        method: 'get',
        params: {
            days: 1,
            areacode: areaCode,
          },
          headers: {
            'X-APISpace-Token': 'g8udxdtq9wwant7c65holaq4bd77z8ky',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    });
}