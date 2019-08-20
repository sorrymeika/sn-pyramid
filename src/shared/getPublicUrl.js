import { joinPath } from "snowball/utils";

export default function getPublicUrl(src) {
    const publicUrl = process.env.PUBLIC_URL;
    return src
        ? publicUrl
        : joinPath(publicUrl, src);
}