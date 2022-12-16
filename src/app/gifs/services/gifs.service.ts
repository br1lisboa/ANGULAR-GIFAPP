import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, GIFType } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {
  private apiKey: string = 'AiXVxmfH5TmwGXUNzkiy5r1UlYaN2wsq'
  private _historial: string[] = []
  private servicioURL: string = 'https://api.giphy.com/v1/gifs'
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string) {
    query = query.trim().toLowerCase()

    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 9)
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    /* console.log(params.toString()) */

    this.http.get<GIFType>(`${this.servicioURL}/search`, { params })
      .subscribe((resp) => {
        /* console.log(resp.data) */
        this.resultados = resp.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    /* if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    } */
  }
}

/* AiXVxmfH5TmwGXUNzkiy5r1UIYaN2wsq */