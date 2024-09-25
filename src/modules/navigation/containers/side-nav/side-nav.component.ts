import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;
    enabled_modules:any;
    dashboard= {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    }
    applicants= {
        icon: 'columns',
        text: 'Applicants',
        link: '/applicants',
    }
    jobs= {
        icon: 'table',
        text: 'Share Jobs',
        link: '/jobs',
    }
    constructor(public navigationService: NavigationService, public userService: UserService) {
        this.enabled_modules = JSON.parse(localStorage.getItem('enabled_modules') || '')
        // console.log(this.enabled_modules)
    }

    ngOnInit() {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
