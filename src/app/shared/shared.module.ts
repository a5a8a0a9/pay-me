import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, NgbModule];

const COMPONENTS: any[] = [];
const PIPES: any[] = [];
const DIRECTIVES: any[] = [];

@NgModule({
	declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
	imports: [...MODULES],
	exports: [...MODULES, ...COMPONENTS, ...PIPES, ...DIRECTIVES]
})
export class SharedModule {}
