import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { trackRequestResult } from '@ngneat/elf-requests';
import { HotToastService } from '@ngneat/hot-toast';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/api-resp.model';
import { environment } from 'src/environments/environment';
import { CategoryRepository } from '../state/category.repository';

@Injectable({ providedIn: 'root' })
export class CategoryService {

    constructor(
        private categoryRepository: CategoryRepository,
        private http: HttpClient,
        private toast: HotToastService
    ) { }

    fetchCategory() {
        this.http.get<Partial<ApiResponse>>(environment.apiUrlSpring + '/category').pipe(
            map((responce) => responce.data),
            tap((data) => this.categoryRepository.setCategory(data)),
            catchError(error => {
                this.toast.error("Network error");
                console.log('error: ', error);
                return of(error);
            }),
            trackRequestResult(['category']),
        ).subscribe();
    }

    // getCategoryId(name: string): number {
    //     var cat = this.categoryRepository.findCategoryByName(name);
    //     return cat ? cat.id : 0;
    // }
    selectCategory(name: string) {
        this.categoryRepository.selectCategory(name);
    }
}