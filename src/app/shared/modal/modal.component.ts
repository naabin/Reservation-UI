import { Component, OnInit, OnDestroy, ElementRef, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {

  constructor(private elementRef: ElementRef) { }

  @Output() dismiss = new EventEmitter();

  ngOnInit() {
    document.body.appendChild(this.elementRef.nativeElement);
  }

  ngOnDestroy(){
    this.elementRef.nativeElement.remove();
  }

  onDismissClick(){
    this.dismiss.emit();
  }

}
