import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {PredictionServiceService} from "../../services/prediction-service.service";
import {House} from "../../../models/House";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-house-form',
  templateUrl: './house-form.component.html',
  styleUrls: ['./house-form.component.scss']
})
export class HouseFormComponent implements OnInit {

  constructor(private predService: PredictionServiceService, private _snackbar: MatSnackBar, private router: Router) { }

  testInputForm = new FormGroup({
    bedrooms: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]$|^[1-9][0-9]$|^[1][0-5][0-9]$"),
      Validators.min(1)
    ]),
    bathrooms: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]$|^[1-9][0-9]$|^[1][0-5][0-9]$"),
      Validators.min(1)
    ]),
    sqft_living: new FormControl('', [
      Validators.required,
      Validators.pattern("^[+]?\\d+([.]\\d+)?$"),
      Validators.min(370)
    ]),
    sqft_above: new FormControl('', [
      Validators.required,
      Validators.pattern("^[+]?\\d+([.]\\d+)?$"),
      Validators.min(370)
    ]),
    sqft_basement: new FormControl('', [
      Validators.required,
      Validators.pattern("^[+]?\\d+([.]\\d+)?$"),
      Validators.min(0)
    ]),
    floors: new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]$|^[1-9][0-9]$|^[1][0-5][0-9]$"),
      Validators.min(1)
    ]),
    waterfront: new FormControl('0', [
      Validators.required
    ]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
    localStorage.clear();
  }

  openSnackBar(): void {
    this._snackbar.open("An error occurred. Try again.", "OK");
  }

  onSubmit(): void {
    if (this.testInputForm.valid) {
      let bedrooms = this.testInputForm.get('bedrooms')?.value;
      let bathrooms = this.testInputForm.get('bathrooms')?.value;
      let sqft_living = this.testInputForm.get('sqft_living')?.value;
      let sqft_basement = this.testInputForm.get('sqft_basement')?.value;
      let sqft_above = this.testInputForm.get('sqft_above')?.value;
      let floors = this.testInputForm.get('floors')?.value;
      let waterfront = this.testInputForm.get('waterfront')?.value;

      let newUserInput = new House(
        bedrooms,
        bathrooms,
        sqft_living,
        sqft_above,
        sqft_basement,
        floors,
        waterfront
      );

      console.log(newUserInput);

      this.predService.predict(newUserInput)
        .then((result: Number) => {
          localStorage.setItem("predictResult", result.toString())

          this.router.navigate(['/result'])
        })
        .catch((err) => {
          console.log(err);
          this.openSnackBar();
        });
    } else {

      this.openSnackBar();
    }
  }
}
