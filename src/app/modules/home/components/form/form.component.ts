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
      this.conversoes = {
        dollar: data['USD']['buy'],
        euro: data['EUR']['buy'],
        peso: data['ARS']['buy'],
      };
    });
  }

}
