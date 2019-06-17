module.exports = {

    pwa: { 
        name: 'AppliFC',
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            runtimeCaching: [ 
                {
                    urlPattern: /^http:\/\/\w+\.applifc\.com\/api\//,
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 60,
                        cacheName: 'applifc-api',
                        cacheableResponse: {
                            statuses: [0, 200]
                        },
                        plugins: [
                            {
                                cacheWillUpdate: ({ response }) => {
                                    const init = {
                                        status: response.status,
                                        statusText: response.statusText,
                                        headers: {},
                                    };

                                    response.headers.forEach((val, key) => (init.headers[key] = val));
                                    
                                    delete init.headers.vary;

                                    return response.text()
                                        .then((body) => new Response(body, init));
                                }
                            }
                        ],
                    }
                },
                {
                    urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'google-fonts-webfonts',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        expiration: {
                            maxEntries: 5,
                            maxAgeSeconds: 60*60*24*365
                        },
                    }
                },
                {
                    urlPattern: /^http:\/\/\w+\.applifc\.com\/images\//,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'applifc-img',
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                        expiration: {
                            maxEntries: 5,
                            maxAgeSeconds: 60*60*24*31
                        },
                    }
                }
            ]
        }
    }
}

