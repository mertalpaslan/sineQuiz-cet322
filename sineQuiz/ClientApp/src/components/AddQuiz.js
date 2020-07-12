import React from 'react';

export class AddQuiz extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data)
        fetch('/api/quiz', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="name">Enter quiz name</label>
                <input id="name" name="name" type="text" />

              

                <label htmlFor="description">Enter description</label>
                <input id="description" name="description" type="text" />

                <button>Send data!</button>
            </form>
        );
    }
}