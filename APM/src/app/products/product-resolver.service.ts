import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { ProductResolved } from "./product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: 'root'
})

export class ProductResolver implements Resolve<ProductResolved> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = Number(route.paramMap.get('id'));

    if (isNaN(id)) {
      const message = `Product id was not a number + ${id}`;
      console.error(message);

      return of({product: null, error:message});
    }

    return this.productService.getProduct(id)
    .pipe(
      map(product => ({product: product})),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of ({product: null, error: message});
      })
    );
  }

}
