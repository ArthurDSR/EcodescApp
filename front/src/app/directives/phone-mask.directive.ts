import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplicar formato: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    let formattedValue = '';
    if (value.length > 0) {
      formattedValue = '(' + value.substring(0, 2);
      if (value.length > 2) {
        formattedValue += ') ' + value.substring(2, 7);
        if (value.length > 7) {
          formattedValue += '-' + value.substring(7, 11);
        }
      }
    }

    input.value = formattedValue;

    // Disparar evento de input para atualizar o FormControl
    const event_input = new Event('input', { bubbles: true });
    input.dispatchEvent(event_input);
  }

  @HostListener('blur')
  onBlur() {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    
    // Validar se tem pelo menos 10 dígitos (número válido)
    if (value.length > 0 && value.length < 10) {
      input.value = '';
    }
  }
}
