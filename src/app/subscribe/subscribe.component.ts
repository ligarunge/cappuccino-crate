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
  subscriberName: string = '';

  subscriptionForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.submitted = true;
    if (this.subscriptionForm.valid) {
      console.log(this.subscriptionForm.value);
      this.subscriberName = this.subscriptionForm.get('name')?.value ?? '';
    }
  }


}
