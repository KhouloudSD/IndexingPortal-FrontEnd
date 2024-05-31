import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';

@Component({
  selector: 'app-app-menu',
  templateUrl: './app-menu.component.html',
  styles: [`
        :host ::ng-deep .p-menubar-root-list {
            flex-wrap: wrap;
        }
    `]
})
export class AppMenuComponent {
  model: any[] = [];

    constructor(public layoutService: LayoutService) { }
    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Post Registration',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['pages/post-registration']
                    },
                    {
                        label: 'Posts',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['pages/posts']
                    },
                    
                    {
                        label: 'redaction',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['pages/redaction']
                    },
                ]
            },
        ];
    }
}

