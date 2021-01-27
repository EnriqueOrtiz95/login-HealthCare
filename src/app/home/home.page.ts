// home.page.ts
import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

interface DoctorData {
  nombreDoctor: string;
  apellidosDoctor: number;
  edad: number;
  especialidad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  doctorList = [];
  doctorData: DoctorData;
  doctorForm: FormGroup;

  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder
  ) {
    this.doctorData = {} as DoctorData;
  }

  ngOnInit() {

    this.doctorForm = this.fb.group({
      nombreDoctor: ['', [Validators.required]],
      apellidosDoctor: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      especialidad: ['', [Validators.required]]
    })

    this.firebaseService.read_doctor().subscribe(data => {

      this.doctorList = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          nombreDoctor: e.payload.doc.data()['nombreDoctor'],
          apellidosDoctor: e.payload.doc.data()['apellidosDoctor'],
          edad: e.payload.doc.data()['edad'],
          especialidad: e.payload.doc.data()['especialidad'],
        };
      })
      console.log(this.doctorList);

    });
  }

  CreateRecord() {
    console.log(this.doctorForm.value);
    this.firebaseService.create_doctors(this.doctorForm.value).then(resp => {
      this.doctorForm.reset();
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.firebaseService.delete_doctor(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditName = record.Name;
    record.EditAge = record.Age;
    record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['nombreDoctor'] = recordRow.EditnombreDoctor;
    record['apellidosDoctor'] = recordRow.EditapellidosDoctor;
    record['edad'] = recordRow.Editedad;
    record['especialidad'] = recordRow.Editespecialidad;
    this.firebaseService.update_doctor(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
