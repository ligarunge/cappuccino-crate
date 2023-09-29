import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  scroll = (event: any): void => {
    const coffeeElement = this.el.nativeElement.querySelector('app-coffee');
    const position = coffeeElement.getBoundingClientRect();

    if (position.top <= window.innerHeight && position.bottom >= 0) {
      this.renderer.addClass(coffeeElement, 'visible');
      window.removeEventListener('scroll', this.scroll, true);
    }
  };

  onMouseOver(event: Event) {
    const targetElement = event.currentTarget as HTMLElement;
    targetElement.style.backgroundColor = '#F8EED8';
  }

  onMouseOut(event: Event) {
    const targetElement = event.currentTarget as HTMLElement;
    targetElement.style.backgroundColor = '';
  }


}
