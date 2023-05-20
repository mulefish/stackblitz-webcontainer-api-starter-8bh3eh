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
            "random_to_check_for_livelyness": Math.random()
        }
    }
}
/* This will happen as soon as the page is loaded */
function setUpLocalstorage_and_tellChildWhatTheKeyIs() {
    const theLocalStoreage = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY);
    if (theLocalStoreage === null) {
        console.log(`%c creating ${LOCAL_STORAGE_GLOBAL_EVENTS_KEY}`, LOG_COLOR)
        localStorage.setItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY, JSON.stringify(default_events));
    } else {
        const rawString = localStorage.getItem(LOCAL_STORAGE_GLOBAL_EVENTS_KEY)
        const events = JSON.parse(rawString)
        const keys = Object.keys(events)
    }
}
// COMMENT IN FOR TDD! 
// COMMENT OUT FOR WEB! 
export { getPrettyDate, default_events };
