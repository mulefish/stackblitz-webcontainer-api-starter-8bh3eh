const LOG_COLOR = "background:lightblue"
function getPrettyDate() {
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

const default_events = {
    "app-response": {
        event: "app-response",
        created: getPrettyDate(),
        json: {
            "event": {
                "attributes": {
                    "details": "this is optional details"
                }
            },
            "id": "this ID should be required"
        }
    },
    "error": {
        event: "error",
        created: getPrettyDate(),
        json: {
            "error": {
                "errorMessage": "string",
                "errorType": "string",
                "errorDetails": "string"
            }
        }
    },
    "general-component-event": {
        event: "general-component-event",
        created: getPrettyDate(),
        json: {
            "component": {
                "id": "string",
                "type": "string",
                "text": "string"
            }
        }
    },
    "page-products-displayed": {
        event: "page-products-displayed",
        created: getPrettyDate(),
        json: {
            "collectionList": [
                {
                    "id": "pdp-recs-vertical-product-image",
                    "type": "recommender",
                    "name": {
                        "unified": "you-may-like",
                        "localized": "You may like"
                    },
                    "productList": [
                        {
                            "categoryUnifiedId": "somecategoryUnifiedId",
                            "unifiedId": "someunifiedId",
                            "productId": "abc123",
                            "skuList": [
                                {
                                    "price": {
                                        "saleWithoutTaxShipping": "",
                                        "regularWithoutTaxShipping": "",
                                        "taxOnly": "",
                                        "isSale": false,
                                        "displaySale": "",
                                        "displayRegular": ""
                                    },
                                    "quantity": -1,
                                    "size": "small",
                                    "sku": "sku123"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    "page-view": {
        event: "page-view",
        created: getPrettyDate(),
        json: {}
    },
    "product-interaction": {
        event: "product-interaction",
        created: getPrettyDate(),
        json: {
            "component": {
                "id": "string",
                "type": "string",
                "text": "string"
            }
        }
    },
    "purchase": {
        event: "purchase",
        created: getPrettyDate(),
        json: {
            "orderId": "string"
        }
    },
    "kittycats": {
        event: "test",
        created: getPrettyDate(),
        json: {
            "this_is_not_real": "string",
            "random_to_check_for_persistence(sic)": Math.random()
        }
    }
}
/* This will happen as soon as the page is loaded */
function setUpLocalstorage_and_tellChildWhatTheKeyIs() {
    const theLocalStoreage = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
    if (theLocalStoreage === null) {
        console.log(`%c CREATING ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
        localStorage.setItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY, JSON.stringify(default_events));
    } else {
        // TODO! SEE HERE!!!
        // Not sure if SMART or DUMB to always keep these...  Or... 
        // TODO: Talk with Shane and Dipali and Francis! 
        // BEGIN MAYBE!
        // GOAL: If a 'default has been zapped' put it back in. But if it has been changed then let it alone.
        const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY)
        const events = JSON.parse(rawString)
        let changed = 0 
        for ( let key in default_events ) {
            if ( ! events.hasOwnProperty(key)) {
                // Put it back! 
                events[key] = default_events[key]
                changed++
                console.log(`%c Adding back ${key} to factory settings`, LOG_COLOR)

            } else {
                // Keep it as is! Might be the same as the original. 
                // Might be different! Whatever. As is. 
            }
        }
        if ( changed > 0 ) {
            console.log(`%c CHANGING ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
            localStorage.setItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY, JSON.stringify(default_events));
        } else {
            console.log(`%c NO CHANGE ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
        }
    }
}
// COMMENT OUT FOR TDD! 
//export { getPrettyDate, default_events };
// COMMENT IN FOR WEB! 
setUpLocalstorage_and_tellChildWhatTheKeyIs()

