import { Component } from '@angular/core';

@Component({
  selector: 'app-test-page',
  standalone: true,
  template: `
    <div style="padding: 40px; text-align:center;">
      <h1>Header & Footer hoạt động OK!</h1>
      <p>Đây là nội dung test xuất hiện giữa header và footer.</p>
    </div>
  `
})
export class TestPage {}
