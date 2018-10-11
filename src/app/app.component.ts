import { Component } from '@angular/core';
import { ApiService } from '../app/api/api.service'

interface Rates {
  Name: string;
  Value: number;
  SellValue: number;
  BuyValue: number;
  Color?: string;
}

interface Exchange {
  date: any;
  base: string;
  rates: Rates[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class AppComponent {
  exchangeData: Exchange;
  ratesData: Rates[] = [];
  isSorted: boolean = true;
  avaliableCurrency: string[] = ['EUR', 'USD', 'GBP', 'AUD', 'CAD', 'JPY'];
  selectedCurrency: string = 'EUR';
  selectedDate: string;


  constructor(private apiService: ApiService) { }


  public ngOnInit(): void {
    this.selectedDate = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    this.apiService.latest().subscribe((data) => {
      this.exchangeData = data;
      this.fillTable(this.exchangeData.rates);
    });
  }

  public onButtonClick(): void {
    if (this.selectedDate === '' || this.selectedCurrency === null) alert('Please fill Date field!')
    else {
      this.apiService.getData(this.selectedDate, this.selectedCurrency).subscribe((data) => {
        this.exchangeData = data;
        this.selectedDate = this.exchangeData.date;
        this.fillTable(this.exchangeData.rates);
      });
    }
  }

  public onHeaderClick(): void {
    this.isSorted = !this.isSorted;
    this.fillTable(this.exchangeData.rates);
  }

  private fillTable(array): void {
    this.ratesData = [];
    array = Object.keys(array).map(key =>
      ({ Name: key, Value: array[key], SellValue: array[key] + (array[key] * 0.05), BuyValue: array[key] - (array[key] * 0.05) }));
    array.forEach(element => {
      if (this.avaliableCurrency.includes(element.Name)) element.Color = 'red';
      else element.Color = 'black';
      if (element.Name !== this.exchangeData.base) this.ratesData.push(element);
    });
    if (this.isSorted) this.ratesData.sort((a, b) => 0 - (a.Name > b.Name ? -1 : 1));
    else this.ratesData.sort((a, b) => 0 - (a.Name > b.Name ? 1 : -1));
  }
}



