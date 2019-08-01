import { util } from "snowball";
import { loader } from "snowball/widget";

class Server {
    constructor({ baseUri }) {
        this.baseUri = baseUri;
    }

    post(url, payload, options = {}) {
        const { isShowLoading, needLogin = true } = options;

        if (needLogin) {
        }

        isShowLoading && loader.showLoader();
        const withComplete = (...fns) => {
            return (res) => {
                isShowLoading && loader.hideLoader();
                const result = fns.reduce((prev, fn) => fn(prev) || prev, res);

                if (process.env.NODE_ENV === 'development') {
                    console.log('%crequest%c ' + url + ' %cresult:', 'border-radius:2px;padding:0 2px;background:blue;color:#fff', 'background:rgb(220, 242, 253);color: rgb(97, 140, 160)', 'background-color: rgb(220, 242, 253); color: rgb(97, 140, 160);', result);
                }
            };
        };

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            const success = withComplete(resolve);
            const error = withComplete((e) => {
                if (e.target.status === 422) {
                    return {
                        success: false,
                        code: -140,
                        message: '参数错误!'
                    };
                }
                return {
                    success: false,
                    code: e.target.status,
                    message: '网络错误!'
                };
            }, reject);

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    success(JSON.parse(xhr.responseText));
                } else {
                    error({ type: 'error', target: xhr });
                }
            });
            xhr.addEventListener('error', (e) => {
                if (xhr.status === 0) {
                    // 网络被页面跳转中断时等待600ms
                    setTimeout(() => {
                        error(e);
                    }, 600);
                } else {
                    error(e);
                }
            });

            xhr.open("POST", util.joinPath(this.baseUri, url), true);
            xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            xhr.withCredentials = true;

            xhr.send(JSON.stringify(payload));
        });
    };
}

export { Server };