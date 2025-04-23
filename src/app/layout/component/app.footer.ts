import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        PROYECTO AVICOLA POR 
        <a href="https://www.facebook.com/sinoe.ruiz.1/" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">SINOE RUIZ</a>
    </div>`
})
export class AppFooter {}
