import { Component, Inject } from "@angular/core";
import { ConfirmDialog } from "../../models/confirm.model";
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
    selector: 'confirm-dialog',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './confirmDialog.component.html',
    styleUrl: './confirmDialog.component.css'
})
export class ConfirmationDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialog) {}
}