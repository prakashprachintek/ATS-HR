import { TestBed } from '@angular/core/testing';

import { OnlineGuard } from './online.guard';

describe('Utility Guards', () => {

    let utilityGuard: OnlineGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                OnlineGuard,
            ],
        });
        utilityGuard = TestBed.inject(OnlineGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            utilityGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
