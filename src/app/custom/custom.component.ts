import { Component, DoCheck, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomComponent),
    }
  ],
})
export class CustomComponent implements ControlValueAccessor,DoCheck {

  @Input() errorMsg:any;
  @Input() custom:any;
  public inputField= new FormControl('');

  private onChange!: (name: string) => void;
  private onTouched!: (() => void) ;
  errorMessages: any[];


  ngDoCheck(): void {
    this.inputField.setErrors(this.errorMsg)
   }

  constructor() { }

  writeValue(obj: any): void {
    this.inputField.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange=fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched=fn;
  }

  doBlur() {
    this.onTouched();
  }

  doInput() {
    this.onChange(this.inputField.value );
  }


}
