import React, { Component } from "react";
import PropTypes from "prop-types";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span>
          <a href="https://university.innopolis.ru/en/">
            &copy; Innopolis University
          </a>{" "}
        </span>
        <span className="ml-auto">
          Powered by{" "}
          <a href="https://university.innopolis.ru/en/">LIPS Lab at IU</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
