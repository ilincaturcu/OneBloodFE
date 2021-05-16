export class Choice {
    constructor(public value: string, public correct?: string) {}
  }
  
  export class Question {
    constructor(public question: string, public choices: Choice[], public question_type:string) {}
  }
  
  export class Quiz {
    constructor(public question: string, public question_type: string, public no: string) {}
  }

  export class Response{
    constructor(public question_number: number, public response:string) {}
  }
  
  export class Answers {
    constructor(public completedAt:string, public cod_donator : string,  public responses: Response[]=[]) {}
  }