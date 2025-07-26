import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = 'http://localhost:5500/api/orders';

  constructor(private httpClient: HttpClient) { }

  getOrderHistory(): Observable<GetResponseOrderHistory> {

    const orderHistoryUrl = `${this.orderUrl}/findByCustomer`;

    const token = localStorage.getItem('angularecommercetoken');
    
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl, { headers });
  }
}

interface GetResponseOrderHistory {
  content: OrderHistory[];
}
