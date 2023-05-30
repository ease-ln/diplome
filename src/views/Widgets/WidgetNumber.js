import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from 'reactstrap/lib/utils';

const propTypes = {
  header: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  footer: PropTypes.bool,
  link: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  cssModule: PropTypes.object,
};

const defaultProps = {
  header: '$1,999.50',
  color: 'primary',
  variant: '0',
  link: '#',
};

class WidgetNumber extends Component {
  render() {
    const { className, cssModule, header, color, footer, link, children, variant, ...attributes } = this.props;

    // demo purposes only
    const padding = ({ card: 'p-3', lead: 'mt-2' });

    const card = { style: '', color: color, classes: 'card' };
    card.classes = mapToCssModules(classNames(className, card.style, padding.card), cssModule);

    const lead = { style: 'h1 mb-0', color: color, classes: '' };
    lead.classes = classNames(lead.style, 'text-' + card.color, padding.lead);

    return (
      <div>
        <div className={card.classes} {...attributes}>
          <div className={lead.classes}>{header}</div>
        </div>
      </div>
    );
  }
}

WidgetNumber.propTypes = propTypes;
WidgetNumber.defaultProps = defaultProps;

export default WidgetNumber;