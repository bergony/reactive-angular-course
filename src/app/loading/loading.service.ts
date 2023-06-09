import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
  loading$: Observable<boolean>;

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return undefined;
  }

  loadingOn() {}

  loadingOff() {}
}
