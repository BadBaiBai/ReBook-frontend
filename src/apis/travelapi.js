import httpInstance from "@/utils/http";

export async function getTravelInfo(location, page = 1) {
    const cityResponse = await httpInstance({
        url: 'https://scenicspot.market.alicloudapi.com/lianzhuo/scenicspot',
        method: 'get',
        headers: {
            Authorization: 'APPCODE 9bd8d71b535242b5805f14577ae238ad',
        },
        params: {
            city: location,
            page,
        }
    });

    if (cityResponse.resp.RespCode === "502") {
        const provinceResponse = await httpInstance({
            url: 'https://scenicspot.market.alicloudapi.com/lianzhuo/scenicspot',
            method: 'get',
            headers: {
                Authorization: 'APPCODE 9bd8d71b535242b5805f14577ae238ad',
            },
            params: {
                province: location,
                page,
            }
        });

        return provinceResponse;
    }

    return cityResponse;
}
