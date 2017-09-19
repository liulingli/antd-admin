/**
 * Created by liulingli on 2017/5/20.
 */
import React, {Component} from "react";
import classNames from "classnames";

export class CardContainer extends Component {
  render() {
    const {children, className,...other} = this.props;
    return (
      <div className={classNames("card-container", className)} {...other}>
          {children}
      </div>
    )
  }
}