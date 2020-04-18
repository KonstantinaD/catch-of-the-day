import React, { Component } from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  //create empty ref
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.shape({
      action: PropTypes.string.isRequired,
      block: PropTypes.func.isRequired,
      createHref: PropTypes.func.isRequired,
      go: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      goForward: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      listen: PropTypes.func.isRequired,
      location: PropTypes.shape({
        hash: PropTypes.string.isRequired,
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
        state: PropTypes.object
      }).isRequired,
      push: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  goToStore = (event) => {
    // 1. stop the form from submitting
    event.preventDefault();
    // 2. get the text from the input
    const storeName = this.myInput.current.value;
    // 3. change the page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please enter a store</h2>
        <input
          type="text"
          //surface the input on the component so that we can grab it
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
