import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { MessagesService } from "./messages.service";
import { tap } from "rxjs/internal/operators/tap";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  showMessages = false;

  errors$: Observable<string[]>;

  constructor(public messagesService: MessagesService) {
    console.log("Created messages component");
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessages = true))
    );
  }

  onClose() {
    this.showMessages = false;
  }
}
