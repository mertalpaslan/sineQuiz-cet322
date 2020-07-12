import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText, CardDeck } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Quizzes extends Component {
    static displayName = Quizzes.name;

    constructor(props) {
        super(props);
        this.state = { quizzes: [], loading: true };
    }

    componentDidMount() {
        this.populateQuizData();
    }

    static renderQuizzesTable(quizzes) {
        return (
            <div>
                <CardDeck>
                {quizzes.map(quiz =>
                <Card body inverse color="success">
                    <CardTitle>{quiz.name}</CardTitle>
                    <CardText>{quiz.description}</CardText>
                        <Button tag={Link} className="text-dark" to={"/quiz/" + quiz.quizId} color="secondary">Solve</Button>
                    </Card>
                    )}
                    </CardDeck>
                <br/>
                <br/>
            </div>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Quizzes.renderQuizzesTable(this.state.quizzes);

        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateQuizData() {
        const response = await fetch('api/quiz');
        const data = await response.json();
        this.setState({ quizzes: data, loading: false });
    }
}
