import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator (controle: AbstractControl) {

    if (controle.value.trim() &&  !/^[a-z0-9_\-]+$/.test(controle.value)) {
        return {
            lowercase: true
        }
    }
    return null; // não retorna nenhum objeto js indicando que não há problema
}
