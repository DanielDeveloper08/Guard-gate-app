import { Component, OnInit, inject } from '@angular/core';
import { ResidencePersonaService } from '../../services/residence.service';
import { IPerson, IResidenceItem } from '../../interfaces/residences.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/shared/services';
import { Position } from 'src/app/shared/interfaces';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-residences',
  templateUrl: './list-residences.component.html',
  styleUrls: ['./list-residences.component.scss'],
})
export class ListResidencesComponent implements OnInit {
  private _residencePersonaService = inject(ResidencePersonaService);
  private _toastService = inject(ToastService);
  filterInput: FormControl = new FormControl('');
  residencesPerson: IResidenceItem[]=[];
  loadingPerson: boolean = false;
  constructor() {
    this.getAllResidences();
  }

  ngOnInit() {}

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getAllResidences();
      event.target.complete();
    }, 2000);
  }

  getAllResidences() {
    this.loadingPerson = true;
    this.residencesPerson = [];
    this._residencePersonaService.getAllResidences().subscribe({
      next: (res) => {
        this.residencesPerson = this.flattenResidences(res.data.records);
        this.loadingPerson = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loadingPerson = false;
        this._toastService.showError(err.error.message, Position.Top);
      },
    });

  }

  controlValueChangeFilter(formControl: FormControl) {
    this.filterInput = formControl;
  }

  flattenResidences(data: IPerson[]): IResidenceItem[] {
    return data.flatMap((person) =>
      person.residences.map((residence) => ({
        names: person.names,
        surnames: person.surnames,
        block: residence.block,
        town: residence.town,
      }))
    );
  }
}
