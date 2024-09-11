function handler(event) {
    const request = event.request;
    const host = request.headers.host ? request.headers.host.value : '';
    const path = request.uri;
    
    let newUrl = 'https://example.com/TEST' +
        '?_host=' + encodeURIComponent(host) +
        '&_path=' + encodeURIComponent(path);

    // URLSearchParams API does not exist yet (CF Function runtime v2).
    for (const key in request.querystring) {
        // Also exists: request.querystring[key].multiValue
        if (typeof request.querystring[key].value === 'string') {
            newUrl += '&' + key + '=' + encodeURIComponent(request.querystring[key].value);
        }
    }
    
    // NOTE: This example function is for a viewer request event trigger. 
    // Choose viewer request for event trigger when you associate this function with a distribution. 
    const response = {
        statusCode: 307,
        statusDescription: 'Temporary Redirect',
        headers: { "location": { "value": newUrl } }
    };
    return response;
}
