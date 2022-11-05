import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Custom Controls with CVA';

  contactForm!: FormGroup;

  fields: any[] =
  [
    {
      label: 'Name',
      key: 'fullName',
      type: 'text',
      fieldType: 'input',
      value: '',
      placeholder:'Please Enter your Name',
      validations: [
        { name: 'Required' },
        { name: 'Min Length', value: 4 },
        { name: 'Max Length', value: 25 },
      ],
    },
    {
      label: 'Email',
      key: 'email',
      type: 'email',
      fieldType: 'input',
      value: '',
      placeholder:'xyz@gmail.com',
      validations: [
        { name: 'Required' },
        { name: 'Email' },
      ],
     },
    {
      label: 'Age',
      key: 'age',
      type: 'number',
      fieldType: 'input',
      value: '',
      placeholder:'Please Enter your age',
      validations: [
        { name: 'Required' },
         { name: 'Min Value', value: 18 },
     { name: 'Max Value', value: 45 }
      ],
    },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.buildForm(this.fields);
    }

  submitForm(){
  if(this.contactForm.valid){
  console.log('This is our Form Value',this.contactForm.value);
  alert("submitted successfully!")
  }
  }

     buildForm( fields:any ) {
    const contactForm =this.fb.group({})
    fields.forEach((field:any) => {

      const control = this.fb.control('',
      this.addValidators(field.validations)
        );
     contactForm.addControl(field.key, control)
    })
    return contactForm;
  }


  addValidators(validations: any) {
    let validators = [];
    for (let valid of validations) {
      if (valid.name === "Min Length") {
        validators.push(Validators.minLength(valid.value));
      } else if (valid.name === "Max Length") {
        validators.push(Validators.maxLength(valid.value));
      }
      else if (valid.name === "Min Value") {
        validators.push(Validators.min(valid.value));
      }
      else if (valid.name === "Max Value") {
        validators.push(Validators.max(valid.value));

      }else if (valid.name === "Required") {
        validators.push(Validators.required);
      } else if (valid.name === "Email") {
        validators.push(
          Validators.email
        );
      } else if (valid.name === "RegEx") {
        validators.push(Validators.pattern(valid.value.toString()));
      }
    }

    return validators;
  }

}

