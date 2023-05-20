function getPrettyDate() {
    const d = new Date()
    const yyyy = d.getFullYear()
    let mm = 1 + d.getMonth()
    if (mm < 10) {
        mm = "0" + mm
    }
    let day = d.getDate()
    if (day < 10) {
        day = "0" + day
    }

    let hour = d.getHours()
    hour -= 12
    if (hour < 10) {
        hour = "0" + hour
    }
    let minute = d.getHours()
    if (minute < 10) {
        minute = "0" + minute
    }
    let second = d.getHours()
    if (second < 10) {
        second = "0" + second
    }
    const yyyymmdd_hhmmss = yyyy + "/" + mm + "/" + day + " " + hour + ":" + minute + ":" + second
    return yyyymmdd_hhmmss

}

const defaults = {
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
        create: getPrettyDate(),
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
        create: getPrettyDate(),
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
        create: getPrettyDate(),
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
    }
}

export { getPrettyDate };