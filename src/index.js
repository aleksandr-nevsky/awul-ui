import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class RangeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleMouseUp(event) {
        console.log("handleReset this.state.value = " + this.state.value)
        fetch("http://awul-host.lu.nevsky.cc:8080/awul/pwm/" + this.state.value,
            {mode: 'no-cors'}
        );
    }

    render() {
        return (
            <div>
                <input type="range" className="custom-range" min="0" max="100" step="10"
                    // onChange={(event) => setRangeval(event.target.value)}
                       onChange={this.handleChange}
                       onMouseUp={this.handleMouseUp}
                       onTouchEnd={this.handleMouseUp}
                       value={this.state.value}
                />
                <h4>The range value is {this.state.value}</h4>
            </div>
        );
    };
}

class ToggleButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
        if (this.state.isToggleOn) {
            fetch("http://awul-host.lu.nevsky.cc:8080/awul/pwm/100",
                {mode: 'no-cors'}
            );
            console.log("set 100");
        } else {
            fetch("http://awul-host.lu.nevsky.cc:8080/awul/pwm/0",
                {mode: 'no-cors'}
            );
            console.log("set 0");
        }
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'Включить' : 'Выключить'}
            </button>
        );
    };
}

class App extends React.Component {
    render() {
        return (
            <div>
                <ToggleButton/>
                <RangeSlider/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);