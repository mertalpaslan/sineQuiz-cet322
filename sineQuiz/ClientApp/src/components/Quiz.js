import React, { Component } from 'react';
import { Button } from "reactstrap";
 
export class Quiz extends Component {
    static displayName = Quiz.name;

    constructor(props) {
        super(props);
        this.state = {
            quiz: {}, current_question: {}, current_question_count: 0, loading: true, question_count: 0, true_answer_count: 0
        };
        this.nextQuestion = this.nextQuestion.bind(this);
    }

    componentDidMount() {
        this.fetchQuestions();
    }

    async fetchQuestions() {
        const response = await fetch(`api/quiz/${this.props.match.params.id}`);
        const data = await response.json();
        this.setState({ quiz: data, current_question: data.questions[0], loading: false });
    }



    nextQuestion() {
        this.setState((prevState) => ({
            current_question_count: prevState.current_question_count + 1
        }))

        this.setState((prevState) => ({
            current_question: this.state.quiz.questions[this.state.current_question_count]
        }))
        console.log(this.state.current_question_count)
        console.log(this.state.current_question)


    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.current_question !== prevState.current_question) {
            this.setState(() => {
                return {
                    current_question: this.state.quiz.questions[this.state.question_count]
                }
            })
        }
    }

    NextQuestionHandler(event, isCorrect) {
        if (isCorrect) {
            event.target.className = "btn btn-success btn-lg btn-block"
            this.setState({
                true_answer_count: this.state.true_answer_count + 1
            });
        }
        else {
            event.target.className = "btn btn-danger btn-lg btn-block"
        }

        this.nextQuestion();
    }

    render() {
        if (this.state.loading) {
            return (<p><em>Loading...</em></p>)
        }
        else {
            return (
                <div>
                    <h1>{this.state.current_question.body}</h1>
                    {this.state.current_question.answers.map(answer => (
                        <Button onClick={(event) => this.NextQuestionHandler(event, answer.isCorrect)} color="primary" size="lg" block>{answer.body}</Button>
                    ))}

                    <p aria-live="polite">Current count: <strong>{this.state.currentCount}</strong></p>

                    <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
                </div>
            );
        }

    }
}
