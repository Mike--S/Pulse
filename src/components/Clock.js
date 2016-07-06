import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';

//@cssModules(styles)

export default class Clock extends Component {
  static propTypes = {
    //styles: PropTypes.object
  };

  constructor() {
    super();

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    this.state = {hour: hour, minute: minute, second: second};
  }

  clockTick(){
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    this.setState({hour: hour, minute: minute, second: second});
  }

  componentDidMount(){
    setInterval(this.clockTick.bind(this), 1000);
  }

  render() {
    return (
      <div>
        {this.state.hour}:
        {this.state.minute}:
        {this.state.second}
      </div>
    );
  }
}



