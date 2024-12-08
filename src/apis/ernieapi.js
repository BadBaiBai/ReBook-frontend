import httpInstance from "@/utils/http";

export function getErnieOtherInfo(city, category) {
    const seekContent = "请用不多于300字的文字来介绍下" + city + "的" + category + "的基本情况"
    return httpInstance({
        url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/ernie-speed-128k',
        method: 'post',
        params: {
            access_token: "24.56d8be3af4f69f4e0523cf019fc74f26.2592000.1731488841.282335-115857182"
        },
        data: {
            "messages": [
                {
                    "role": "user",
                    "content": seekContent,
                }
            ]
        },
        timeout: 30000
    });
}