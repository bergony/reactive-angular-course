import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoadingService } from "../loading/loading.service";
import { MessagesService } from "../messages/messages.service";
import { sortCoursesBySeqNo } from "../model/course";
import { Course } from "./../model/course";

@Injectable({
  providedIn: "root",
})
export class CoursesStore {
  private subject = new BehaviorSubject<Course[]>([]);

  course$: Observable<Course[]> = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService
  ) {
    this.loadAllCourses();
  }
  private loadAllCourses() {
    const laodCourses$ = this.http.get<Course[]>("/api/courses").pipe(
      map((response) => response["payload"]),
      catchError((err) => {
        const message = "Could not load courses";
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((courses) => this.subject.next(courses))
    );

    this.loading.showLoaderUntilCompleted(laodCourses$).subscribe();
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.course$.pipe(
      map((courses) =>
        courses
          .filter((course) => (course.category = category))
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
