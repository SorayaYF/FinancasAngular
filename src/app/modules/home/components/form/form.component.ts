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

  public moeda!: Moeda;
  public real: string = '';

  getData(): Observable<any> {
    let url = 'https://api.hgbrasil.com/finance?format=json-cors&key=c66848a7';
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public buscarMoeda() {
    this.getData().subscribe((data) => {
      this.moeda = {
        dollar: data['results']['currencies']['USD']['buy'],
        euro: data['results']['currencies']['EUR']['buy'],
        peso: data['results']['currencies']['ARS']['buy'],
      };
    });
  }

}
