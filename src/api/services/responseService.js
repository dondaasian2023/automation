function extractModel(response) {
    return response.body?.model ?? {};
}

function hasStatusCode(res, expectedStatusCode) {
    const {
        statusCode,
        request: { method, url },
    } = res;

    if (statusCode !== expectedStatusCode)
        throw new Error(
            `Expected ${expectedStatusCode}, but found ${statusCode}.\n${method} to ${url}\n`
        );
    return res;
}

export { extractModel, hasStatusCode };
