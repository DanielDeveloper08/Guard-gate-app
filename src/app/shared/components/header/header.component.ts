import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title!: string;
  @Input() backIcon!: boolean;
  @Input() urlBack!: string;
  @Input() urlNext!: string;
  @Input() disabledNextButton!: boolean;
  @Input() cancelButton!: boolean;

  @Output() backClick: EventEmitter<void> = new EventEmitter<void>();
  private _router = inject(Router);

  constructor() {}

  ngOnInit() {}

  back() {
    this.backClick.emit();
    if (this.urlBack) {
      this._router.navigateByUrl(this.urlBack);
    }
  }

  next() {
    if (this.disabledNextButton) return;
    this._router.navigateByUrl(this.urlNext);
  }
}
