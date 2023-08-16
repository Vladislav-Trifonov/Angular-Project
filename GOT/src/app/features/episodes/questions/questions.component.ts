import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  constructor(
    private titleService: Title,
  ) {}

  questions = [
    {
      question: `Which character is know as the "mother of dragons"?`,
      options: ['Cersei', 'Daenerys', 'Sansa', 'Melisandra'],
      correctAnswer: 1
    },
    {
      question: "Which former ranger of the Night’s Watch led an army of wildlings as the “King-Beyond-the-Wall”?",
      options: ['Mance Rayder', 'Janos Slynt', 'Tormund Giantsbane', 'Craster'],
      correctAnswer: 0
    },
    {
      question: "What are the “house words” of House Greyjoy?",
      options: ['We Do Not Sow', 'Winter Is Coming', 'Unbowed, Unbent, Unbroken', 'Ours Is the Fury'],
      correctAnswer: 0
    }, 
    {
      question: "Who is the youngest of Ned Stark’s children?",
      options: ['Bran', 'Sansa', 'Rob', 'Rickon'],
      correctAnswer: 3
    }, {
      question: `Which character, also known as the Lightning Lord, gets continually resurrected by Thoros of Myr after he dies?`,
      options: ['Alliser Thorne', 'Jaqen H’ghar', 'Barristan Selmy', 'Beric Dondarrion'],
      correctAnswer: 3
    }
  ];

  selectedAnswers = new Array(this.questions.length).fill(null);
  correctAnswersCount = 0;
  currentQuestionIndex = 0;

  selectAnswer(answerIndex: number) {
    this.selectedAnswers[this.currentQuestionIndex] = answerIndex;
    if (answerIndex === this.questions[this.currentQuestionIndex].correctAnswer) {
      this.correctAnswersCount++;
    }
  }

  getAnswerClass(answerIndex: number) {
    if (this.selectedAnswers[this.currentQuestionIndex] === answerIndex) {
      return answerIndex === this.questions[this.currentQuestionIndex].correctAnswer ? 'correct' : 'incorrect';
    }
    return '';
  }

  isAnswerSelected(): boolean {
    return this.selectedAnswers[this.currentQuestionIndex] !== null;
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  ngOnInit(): void {
    this.titleService.setTitle('Quiz');
  }

  ngOnDestroy() {
    this.correctAnswersCount = 0;
  }
}