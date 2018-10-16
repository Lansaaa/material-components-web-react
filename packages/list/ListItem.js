// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class ListItem extends Component {
  listItemElement_ = React.createRef();

  componentDidUpdate(prevProps) {
    if (this.props.className !== prevProps.className) {
      this.props.updateClassList(this);
    }
  }

  get classes() {
    const {className} = this.props;
    return classnames('mdc-list-item', className);
  }

  focus() {
    const element = this.listItemElement_.current;
    if (element) {
      element.focus();
    }
  }

  followHref() {
    const element = this.listItemElement_.current;
    if (element && element.href) {
      element.click();
    }
  }

  toggleCheckbox() {
    // TODO(bonniez): implement
  }

  render() {
    const {
      /* eslint-disable */
      className,
      childrenTabIndex,
      updateClassList,
      /* eslint-enable */
      graphic,
      meta,
      primaryText,
      secondaryText,
      ...otherProps
    } = this.props;

    return (
      <li
        className={this.classes}
        ref={this.listItemElement_}
        {...otherProps}
      >
        {this.renderGraphic(graphic)}
        {this.renderText(primaryText, secondaryText)}
        {this.renderMeta(meta)}
      </li>
    );
  }

  renderGraphic(graphic) {
    if (!graphic) {
      return null;
    }

    const {
      tabIndex,
      ...otherProps
    } = graphic.props;
    const props = {
      tabIndex: tabIndex != undefined ? this.props.childrenTabIndex : -1,
      ...otherProps,
    };
    return (
      <span
        className='mdc-list-item__graphic'
        role='presentation'
      >
        {React.cloneElement(graphic, props)}
      </span>
    );
  }

  renderText(primaryText, secondaryText) {
    if (secondaryText) {
      return (
        <span className='mdc-list-item__text'>
          <span className='mdc-list-item__primary-text'>{primaryText}</span>
          <span className='mdc-list-item__secondary-text'>{secondaryText}</span>
        </span>
      );
    } else {
      return (<span className='mdc-list-item__text'>{primaryText}</span>);
    }
  }

  renderMeta(meta) {
    if (!meta) {
      return null;
    }

    if (typeof meta === 'string') {
      return (
        <span className='mdc-list-item__meta'>{meta}</span>
      );
    }

    const {
      className,
      tabIndex,
      ...otherProps
    } = meta.props;
    const props = {
      className: classnames(className, 'mdc-list-item__meta'),
      tabIndex: tabIndex != undefined ? this.props.childrenTabIndex : -1,
      ...otherProps,
    };
    return React.cloneElement(meta, props);
  }
}

ListItem.propTypes = {
  childrenTabIndex: PropTypes.number,
  className: PropTypes.string,
  primaryText: PropTypes.string,
  secondaryText: PropTypes.string,
  graphic: PropTypes.element,
  meta: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  updateClassList: PropTypes.func,
};

ListItem.defaultProps = {
  childrenTabIndex: -1,
  className: '',
  primaryText: '',
  secondaryText: '',
  graphic: null,
  meta: null,
  updateClassList: () => {},
};
