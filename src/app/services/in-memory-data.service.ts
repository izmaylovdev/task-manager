import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService {

  constructor() { }

  createDb () {
    const boards = [
      {
        name: 'Tasks',
        tasks: [
          'Sign in',
          'Create first task'
        ]
      },
      {
        name: 'In Work',
        tasks: []
      }
    ];
    return { boards };
  }
}
