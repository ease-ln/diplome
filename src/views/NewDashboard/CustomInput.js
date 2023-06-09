import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import { formatDate } from "./Helpers/DashboardHelper";

class CustomInput extends Component {
  render() {
    return (
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            {this.props.text ? (
              <>
                <span
                  role="img"
                  aria-label="calendar-icon"
                  style={{ marginRight: "5px" }}
                >
                  📅
                </span>
                <span style={{ minWidth: "70px" }}>{this.props.text}</span>
              </>
            ) : (
              <span role="img" aria-label="calendar-icon">
                📅
              </span>
            )}
          </InputGroupText>
        </InputGroupAddon>
        <Input
          onClick={this.props.disabled ? () => {} : this.props.onClick}
          onChange={this.props.disabled ? () => {} : this.props.onClick}
          value={formatDate(this.props.date)}
          disabled={this.props.disabled ? true : false}
          className={`date-input ${this.props.disabled && "disabled"}`}
        />
      </InputGroup>
    );
  }
}

export default CustomInput;
