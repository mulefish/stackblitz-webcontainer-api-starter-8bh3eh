function flattenCategoricalOptionalityObjects() {
  const flat = flatten(everything);
  document.getElementById('selectedEvent').innerHTML =
    'Flat CategoricalOptionalityObjects';
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}

let selectedView = 'schemaView';
function setSelectedOption() {
  selectedView = document.querySelector('input[name="option"]:checked').value;
}

function flattenTransformationModule_defaultCategorizedEvents() {
  const flat = flatten(transformationModule.defaultCategorizedEvents);
  document.getElementById('selectedEvent').innerHTML =
    'Flat TransformationModule';
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat,
    null,
    2
  );
}
function beautify() {
  try {
    const x = document.getElementById('bottom_left_textArea').value;
    const obj = JSON.parse(x);
    document.getElementById('bottom_left_textArea').value = JSON.stringify(
      obj,
      null,
      2
    );
  } catch (boom) {
    alert(boom);
  }
}
function inflateFlatMap(simple) {
  const complex = {};
  for (const key in simple) {
    const levels = key.split('.');
    let currLevelObj = complex;
    for (let i = 0; i < levels.length; i++) {
      const levelKey = levels[i];
      if (!currLevelObj.hasOwnProperty(levelKey)) {
        currLevelObj[levelKey] = {};
      }
      if (i === levels.length - 1) {
        currLevelObj[levelKey] = simple[key];
      }
      currLevelObj = currLevelObj[levelKey];
    }
  }
  return complex;
}

function createObjectToSend(event) {
  const ary_of_keys_to_send = Object.keys(event['default']['payload']);
  const sendThis = {};
  ary_of_keys_to_send.forEach((key) => {
    const x = lookup[key];
    sendThis[key] = x;
  });
  return sendThis;
}

function setStore() {
  const x = document.getElementById('bottom_left_textArea').value;
  localStorage.setItem('register1', x);
}

function getStore() {
  const x = localStorage.getItem('register1');
  try {
    const obj = JSON.parse(x);
    document.getElementById('bottom_left_textArea').value = JSON.stringify(
      obj,
      null,
      2
    );
  } catch (ohno_bad_json) {
    document.getElementById('bottom_left_textArea').value = x;
  }
}

function beautifulJson(HoH) {
  let result = {};
  for (let k in HoH) {
    result[k] = inflateFlatMap(HoH[k]);
  }
  inflateFlatMap;
  return result;
}

function buildEventWhileIgnoringTheAutomaticallyGiven(flat_event_to_send) {
  let collector = {};
  const lam = flatten(everything['BASE_REQUIRED_LAM']['payload'], null, 2);
  for (let k in flat_event_to_send) {
    let isKeep = true;
    for (let k2 in lam) {
      if (k.startsWith(k2)) {
        isKeep = false;
      }
    }
    if (isKeep === true) {
      collector[k] = flat_event_to_send[k];
    }
  }
  return collector;
}

function reverseSortStringsOnLength(arr) {
  arr.sort(function (a, b) {
    return b.length - a.length;
  });
  return arr;
}

function upperCasify(aryOfStrings) {
  let result = [];
  aryOfStrings.forEach((thing) => {
    const pieces = thing.split('.');
    pieces[0] = pieces[0].toUpperCase();
    result.push(pieces.join('.'));
  });
  return result;
}
function superExpensiveMatch(flat_everything, array_of_almost_keys) {
  // Yes! This is crazy 'expensive'. But it is only 1 millisecond!
  let result = {};
  for (let keyWhichMightHaveQuestionMarks in flat_everything) {
    const candidate = keyWhichMightHaveQuestionMarks.replace(/\?/g, '');
    array_of_almost_keys.forEach((key) => {
      if (candidate === key) {
        result[candidate] = flat_everything[keyWhichMightHaveQuestionMarks];
      }
    });
  }
  return result;
}

function makeItRightShape(map, eventName) {
  // THESE FUNC = I lost.

  if (eventName === 'error') {
    let errorObj = { error: {} };
    for (let k in map['EVENT']['attributes']) {
      const v = map['EVENT']['attributes'][k];
      errorObj['error'][k] = v;
    }
    return errorObj;
  } else if (eventName === 'general-component-event') {
    return map['EVENT'];
  } else if (eventName === 'product-interaction') {
    return map['EVENT'];
  } else if (eventName === 'purchase') {
    return map['EVENT']['attributes'];
  } else if (eventName === 'app-response') {
    return {
      event: {
        attributes: {
          details: 'this is optional details',
        },
      },
      id: 'this ID should be required',
    };
  } else if (eventName === 'page-products-displayed') {
    const productCollectionObject = {
      collectionList: [
        {
          id: 'pdp-recs-vertical-product-image',
          type: 'recommender',
          name: {
            unified: 'you-may-like',
            localized: 'You may like',
          },
          productList: [
            {
              categoryUnifiedId: 'somecategoryUnifiedId',
              unifiedId: 'someunifiedId',
              productId: 'abc123',
              skuList: [
                {
                  price: {
                    saleWithoutTaxShipping: '',
                    regularWithoutTaxShipping: '',
                    taxOnly: '',
                    isSale: false,
                    displaySale: '',
                    displayRegular: '',
                  },
                  quantity: -1,
                  size: 'small',
                  sku: 'sku123',
                },
              ],
            },
          ],
        },
      ],
    };

    return productCollectionObject;
  } else {
    return map;
  }
}

function loadDefaultsIntoLocalStorageIfNeeded() {  
  




}



function loadThisEvent(eventName) {
  document.getElementById('statusOfTheSend').innerHTML = '';
  document.getElementById('statusOfTheSend').style.backgroundColor = 'white';

  const flat_everything = flatten(everything);

  let flat_object = flatten(
    everything['categoricalOptionalityObjects'][eventName]['default']['payload']
  );
  flat_object = buildEventWhileIgnoringTheAutomaticallyGiven(flat_object);
  let keys = Object.keys(flat_object);
  keys = reverseSortStringsOnLength(keys);
  keys = upperCasify(keys);
  const found = superExpensiveMatch(flat_everything, keys);
  const inflatedThing = inflateFlatMap(found);
  const whatToSend = makeItRightShape(inflatedThing, eventName);

  currentEventName = eventName;
  document.getElementById('selectedEvent').innerHTML = eventName;

  const transformThing = inflateFlatMap(
    transformationModule.defaultCategorizedEvents[eventName]['default']['$'][
      'payload'
    ]
  );
  const flat_transformThing = flatten(transformThing);
  document.getElementById('bottom_right_textArea').value = JSON.stringify(
    flat_transformThing,
    null,
    2
  );

  document.getElementById('bottom_left_textArea').value = JSON.stringify(
    whatToSend,
    null,
    2
  );
}

function showTdr() {
  const eventName = document.getElementById('selectedEvent').innerHTML;

  const str = document.getElementById('bottom_left_textArea').value;
  let x = `trackEvent("${eventName}",${str}\n)`;

  document.getElementById('bottom_right_textArea').value = x;
}

async function sendIt() {
  const eventName = document.getElementById('selectedEvent').innerHTML;
  try {
    const x = JSON.parse(document.getElementById('bottom_left_textArea').value);
    const theResult = await MwaAnalytics.trackEvent(eventName, x);
    const base = theResult['payload']['properties'];
    thePayload =
      theResult['payload']['properties']['validationResult']['data']['payload'];
    document.getElementById('bottom_right_textArea').value = JSON.stringify(
      thePayload,
      null,
      2
    );
    // Got that back - now see if it was good or not
    const flat_payload = flatten(thePayload);
    let i = 0;
    for (let k in flat_payload) {
      const v = flat_payload[k];
      i++;
    }

    const whatGotSent = JSON.parse(
      document.getElementById('bottom_left_textArea').value
    );
    const flat_whatGotSent = flatten(whatGotSent);
    let simple = {};
    for (let k in flat_whatGotSent) {
      const v = flat_whatGotSent[k];
      const pieces = k.split('.');
      const k2 = pieces[pieces.length - 1];
      simple[k2] = v;
    }
    console.log(simple);

    let isOk = [];
    for (let k in simple) {
      let v = simple[k];
      let itIsGood = false;
      for (let k2 in flat_payload) {
        const v2 = flat_payload[k2];
        if (v2 === v) {
          itIsGood = true;
        }
      }
      isOk.push(itIsGood);
    }
    const allTrue = isOk.every((v) => v === true);
    if (allTrue === false) {
      console.log('%c FAIL ', 'background:red');
      document.getElementById('statusOfTheSend').innerHTML = 'FAIL';
      document.getElementById('statusOfTheSend').style.backgroundColor = 'red';
    } else {
      console.log('%c PASS ', 'background:green');
      document.getElementById('statusOfTheSend').innerHTML = 'PASS';
      document.getElementById('statusOfTheSend').style.backgroundColor =
        'green';
    }
  } catch (boom) {
    document.getElementById('bottom_right_textArea').value = boom;
  }
}
