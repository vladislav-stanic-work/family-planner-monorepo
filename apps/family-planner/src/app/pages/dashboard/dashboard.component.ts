import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fpl-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userName = '';

  ngOnInit(): void {
    const user = localStorage.getItem('user') || '';
    this.userName = JSON.parse(user)?.name;
  }
}
