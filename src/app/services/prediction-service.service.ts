import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import  {loadGraphModel} from  '@tensorflow/tfjs-converter'
import {getChangesForTarget} from "@angular/cdk/schematics";
import {compileResults} from "@angular/compiler-cli/src/ngtsc/annotations/src/util";
import {House} from "../../models/House";

@Injectable({
  providedIn: 'root'
})
export class PredictionServiceService {

  maxBedrooms = 9;
  minBedrooms = 0;

  maxBathrooms = 8;
  minBathrooms = 0;

  maxSqftLiving = 13540;
  minSqftLiving = 370;

  maxSqftAbove = 9410;
  minSqftAbove = 370;

  maxSqftBasement = 4130;
  minSqftBasement = 0;

  maxFloors = 3.5;
  minFloors = 1;

  maxPrice = 2888000.0;
  minPrice = 7800;

  constructor() { }

  public async predict(input) : Promise<Number> {
    const model = await loadGraphModel('../../assets/models/model.json');

    const {
      bedrooms,
      bathrooms,
      sqft_living,
      sqft_above,
      sqft_basement,
      floors,
      waterfront
    } = input;

    let values = tf.tensor([
      this.normalize(bedrooms, this.maxBedrooms, this.minBedrooms),
      this.normalize(bathrooms, this.maxBathrooms, this.minBathrooms),
      this.normalize(sqft_living, this.maxSqftLiving, this.minSqftLiving),
      this.normalize(sqft_above, this.maxSqftAbove, this.minSqftAbove),
      this.normalize(sqft_basement, this.maxSqftBasement, this.minSqftBasement),
      this.normalize(floors, this.maxFloors, this.minFloors),
      waterfront
    ]);

    let reshaped = tf.reshape(values, [-1,7]);

    const prediction = model.predict(reshaped) as any;

    const result = tf.squeeze(prediction, [0]);

    const price = result.dataSync();
     console.log(price[0]);

    return (price[0] * (this.maxPrice - this.minPrice));
  }

  normalize(actual, min, max) {
    return actual / (max - min)
  }
}
