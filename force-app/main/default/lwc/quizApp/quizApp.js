import { LightningElement, track} from 'lwc';

export default class QuizApp extends LightningElement {
    @track selectedAnswer = {}; //for storing answer
    NotAnsweredAll = true;
    correctAnswerChoosen = 0;
    isSubmitted = false;

    myQuestions = [
        {
            id: 'Question1',
            question: 'Which one of the following is not a template loop',
            options: {
                a: 'for:each',
                b: 'iteratior',
                c: 'map loop'
            },
            correctAnswer: 'c'
        },
        {
            id: 'Question2',
            question: 'Which of the file is invalid in LWC component folder',
            options: {
                a: '.svg',
                b: '.apex',
                c: '.js'
            },
            correctAnswer: 'b'
        },
        {
            id: 'Question3',
            question: 'Which one of the following is not a directive',
            options: {
                a: 'for:each',
                b: 'if:true',
                c: '@track'
            },
            correctAnswer: 'c'
        }
    ]

    //used for disabling btn
    get notAnsweredAll(){
        return !(Object.keys(this.selectedAnswer).length === this.myQuestions.length)
    }

    //Form applying dynamic css
    get isScoredFull(){
        return `slds-text-heading_large ${ this.correctAnswerChoosen === this.myQuestions.length ? 'slds-text-color_success' : 'slds-text-color_error'}`;

        // return this.correctAnswerChoosen === this.myQuestions.length ? 'slds-text-heading_large slds-text-color_success' : 'slds-text-heading_large slds-text-color_error';
    }

    //Option selection handler on every click on the options
    selectOptionHandler(e){
        const {name, value} = e.target;
        this.selectedAnswer = {...this.selectedAnswer, [name] : value};
        console.log("selans", this.selectedAnswer);
        console.log("selans1", JSON.stringify(this.selectedAnswer));

    }

    //Form Submit Handler
    submitHandler(event){
        event.preventDefault();
        let correct = this.myQuestions.filter(item => this.selectedAnswer[item.id] === item.correctAnswer);
        this.correctAnswerChoosen = correct.length;
        this.isSubmitted = true;

    }

    //Form Reset Handler
    resetHandler() {
        this.selectedAnswer = {};
        this.correctAnswerChoosen = 0;
        this.isSubmitted = false;
    }
}