import { map, mergeMap, flatMap, catchError } from "rxjs/operators";
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { ofType } from 'redux-observable'
import { STREAMS_API, ADD_PRICEFEED } from "../constants";

import {
  FETCH_STREAMS,
  FAILED_ADD_STREAM,
  ADD_STREAM,
  FAILED_GET_STREAM,
  addStreamSuccess,
  fetchStreamSuccess,
} from "../actions/get_streams";


// arbitrary value for priceOffer
const priceOffer = {
  buyPrice: 120,
  sellPrice: 125
};

// arbitrary value for bestBuy and bestSell
const bestBuyValue = 122;
const bestSellValue = 123;

//map streams
export const map_streams = (priceFeeds) => (
  priceFeeds.map((priceFeed) => (assignStream(priceFeed)))
);

export const assignStream = (priceFeed) => (
    {
        symbol: priceFeed.symbol,
        timestamp: priceFeed.time,
        bestBuyPrice: {
            value: bestBuyValue,
            spread: bestBuyValue - priceOffer.sellPrice,
            provider: priceFeed.providerName,
        },
        bestSellPrice: {
            value: bestSellValue,
            spread: bestSellValue - priceOffer.buyPrice,
            provider: priceFeed.providerName,
        }
    }
);

export const fetchStreams = action$ =>
  action$
    .pipe(
      ofType(FETCH_STREAMS),
      mergeMap( () =>
        ajax.getJSON(`${STREAMS_API}`).pipe(
        map(({priceFeeds}) => fetchStreamSuccess(map_streams(priceFeeds)))
        )
      ),
        catchError(error => of({
          type: FAILED_GET_STREAM,
          payload: error,
          error: true
        }))
    );

const addPriceFeed = priceFeed =>
    ajax({
        url: `${ADD_PRICEFEED}/new`,
        method: "POST",
        body: priceFeed
    }).pipe(map(data => {
        return data.response
    }));

export const addStream = action$ =>
    action$
        .pipe(
            ofType(ADD_STREAM),
            mergeMap(action => (addPriceFeed(action.priceFeed))),
            map(({priceFeed}) => addStreamSuccess(priceFeed)),
            catchError(error => of({
                type: FAILED_ADD_STREAM,
                payload: error,
                error: true
            }))
        );