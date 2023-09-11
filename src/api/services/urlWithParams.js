import applyStringParams from 'src/utils/applyStringParams';

export default function urlWithParams(url, paramsObj, configObj) {
    return applyStringParams(url, paramsObj, configObj);
}
