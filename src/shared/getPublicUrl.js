import { joinPath } from "snowball/utils";

export default function getPublicUrl(src) {
    const publicUrl = process.env.REACT_APP_PROJECT_URL;
    return src
        ? joinPath(publicUrl, src)
        : publicUrl;
}