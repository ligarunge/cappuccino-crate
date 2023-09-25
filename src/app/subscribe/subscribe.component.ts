import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  submitted = false;
  countries = ['Latvia', 'Lithuania', 'UK', 'Australia', 'India'];

  subscriptionForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.submitted = true;
    console.log('submitted', this.submitted)
    if (this.subscriptionForm.valid) {
      console.log(this.subscriptionForm.value);
      // You might want to reset the form and the submitted flag here if the submission is successful
       this.subscriptionForm.reset();
       this.submitted = false;
    }
  }


}
