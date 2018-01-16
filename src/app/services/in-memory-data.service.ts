import { Injectable } from '@angular/core';

@Injectable()
export class InMemoryDataService {

  constructor() { }

  createDb () {
    const boards = [
      {
        id: 0,
        name: 'Tasks',
        tasks: [
          { id: 0, text: 'Sign in' },
          { id: 1, text: 'Create first task' },
        ]
      },
      {
        id: 1,
        name: 'In Work',
        tasks: []
      }
    ];
    return { boards };
  }
}
