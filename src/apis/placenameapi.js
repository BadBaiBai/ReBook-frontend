import httpInstance from "@/utils/http";

export function getPlaceNameInfo() {
    return httpInstance({
        url: 'https://www.mxnzp.com/api/address/list',
        method: 'get',
        params: {
            app_id: 'apqmmpmzpwrg9ccm',
            app_secret: 'jXZ0QvqndC3vxl3I856ZstSCISSKXC5A',
        }
    });
}