export class Choice {
    constructor(public value: string, public correct?: string) {}
  }
  
  export class Question {
    constructor(public question: string, public choices: Choice[]) {}
  }
  
  export class Quiz {
    constructor(public question: string, public question_type: string, public no: string) {}
  }
  
  export class Answers {
    constructor(public values: Choice[] = []) {}
  }