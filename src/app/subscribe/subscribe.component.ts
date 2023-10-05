import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

interface JokeResponse {
  jokes: Array<{
    id: number;
    joke: string;
  }>;
  available: number;
}

interface Joke {
  id: number;
  joke: string;
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  submitted = false;
  countries = ['Latvia', 'Lithuania', 'UK', 'Australia', 'India'];
  subscriberName: string = '';
  jokesArray: Joke[] = [];
  randomJoke!: Joke;


  subscriptionForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  onSubmit() {
    this.submitted = true;
    if (this.subscriptionForm.valid) {
      console.log(this.subscriptionForm.value);
      this.subscriberName = this.subscriptionForm.get('name')?.value ?? '';
    }
  }

  fetchData() {
    const url = 'https://humor-jokes-and-memes.p.rapidapi.com/jokes/search?exclude-tags=nsfw&keywords=coffee&min-rating=7&include-tags=one_liner&number=3&max-length=200';
    const headers = {
      'X-RapidAPI-Key': '28be9b211amsh3d2970677647018p1b7d33jsn1fab347fc0a6',
      'X-RapidAPI-Host': 'humor-jokes-and-memes.p.rapidapi.com'
    };

    this.http.get<JokeResponse>(url, { headers }).subscribe({
      next: response => {
        this.jokesArray = response.jokes;
        const randomIndex = Math.floor(Math.random() * this.jokesArray.length);
        this.randomJoke = this.jokesArray[randomIndex];
        console.log(this.randomJoke);
      },
      error: error => {
        console.error('Error:', error);
      }
    });
    
  }

}
