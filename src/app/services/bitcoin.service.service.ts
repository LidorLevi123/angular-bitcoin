import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { storageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class BitcoinService {

    TRADE_VOLUME_KEY = 'tradeVolume'

    constructor(private http: HttpClient) { }

    getRate(coins: number) {
        return this.http.get<string>(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
            .pipe(catchError(err => throwError(() => err)))
    }

    getTradeVolume() {
        const data = storageService.load(this.TRADE_VOLUME_KEY)

        if (data) return of(data)
        return this.http.get<{ values: { x: number, y: number }[] }>(`https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true`)
            .pipe(map(res => {
                //prepare the data in a way that the chart can render
                const vals = res.values.map(item => { return { name: new Date(item.x * 1000).toLocaleDateString("en-US"), value: item.y } })
                storageService.store(this.TRADE_VOLUME_KEY, vals)
                return vals
            }))
    }

}

