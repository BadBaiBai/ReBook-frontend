import httpInstance from "@/utils/http";

export function getAreaCodeInfo(city) {
    return httpInstance({
        url: 'https://eolink.o.apispace.com/24234/function/v001/city',
        method: 'get',
        params: {
            location: city,
            items: 10,
            area: 'china',
            language: '',
            withTz: '',
            withPoi: true,
          },
          headers: {
            'X-APISpace-Token': 'g8udxdtq9wwant7c65holaq4bd77z8ky',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    });
}