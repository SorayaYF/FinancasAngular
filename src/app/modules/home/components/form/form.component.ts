import { Component } from '@angular/core';
import { Moeda } from '../../models/moeda';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  constructor(private http: HttpClient) {}

  public conversoes!: Moeda;
  public real!: number;

  getData(): Observable<any> {
    let url = 'https://api.hgbrasil.com/finance?format=json-cors&key=c66848a7';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response.results.currencies;
      })
    );
  }

  public converte() {
    this.getData().subscribe((data) => {
      const realDolar = (this.real / data.USD.buy).toFixed(2);
      const realEuro = (this.real / data.EUR.buy).toFixed(2);
      const realPeso = (this.real / data.ARS.buy).toFixed(2);
      this.conversoes = {
        dollar: Number(realDolar),
        euro: Number(realEuro),
        peso: Number(realPeso),
      };
    });
  }

}
