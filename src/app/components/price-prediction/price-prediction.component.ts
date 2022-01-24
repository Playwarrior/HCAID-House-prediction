import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-price-prediction',
  templateUrl: './price-prediction.component.html',
  styleUrls: ['./price-prediction.component.scss']
})
export class PricePredictionComponent implements OnInit {

  result: string = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let result = localStorage.getItem('predictResult');

    if(result != null) {
      this.result = Number(localStorage.getItem('predictResult')).toFixed(2)
    } else {
      this.router.navigate(['/dashboard'])
    }

  }

}
