import React, { Component } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.objectOf(
      PropTypes.shape({
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      }).isRequired
    ).isRequired,
    order: PropTypes.objectOf(PropTypes.number.isRequired).isRequired,
    removeOneFromOrder: PropTypes.func.isRequired,
    removeAllFromOrder: PropTypes.func.isRequired
  };

  renderOrder = (key) => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };

    let buttonRemoveAll;
    if (count > 1) {
      buttonRemoveAll = (
        <button onClick={() => this.props.removeAllFromOrder(key)}>
          &times;
        </button>
      );
    }

    //make sure the fish is loaded before we continue - don't display in Order until we get the fish in the menu
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : "the fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
              >
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={() => this.props.removeOneFromOrder(key)}>
              &times;
            </button>
          </span>
          {buttonRemoveAll}
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderFishIds = Object.keys(this.props.order);
    const total = orderFishIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return prevTotal + count * fish.price;
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderFishIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
