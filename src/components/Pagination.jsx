import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
  };

  onPrevClick = () => {
    if (this.props.page > 1) {
      this.setPage(this.props.page - 1);
    }
  };

  onNextClick = () => {
    const { pageCount } = this.props;

    if (this.props.page < pageCount) {
      this.setPage(this.props.page + 1);
    }
  };

  onPageClick = (page) => {
    this.setPage(page);
  };

  setPage(page) {
    this.props.onPageChanged(page);
  }

  getPageButton(page) {
    const className = classnames('pagination-btn pagination-page', { active: this.props.page === page });
    return (
      <button
        key={page}
        className={className}
        onClick={() => this.onPageClick(page)}
      >
        {page}
      </button>
    );
  }

  renderPages() {
    const { page, pageCount } = this.props;
    const pages = [];

    if (pageCount < 8) {
      for (let i = 1; i < 8 && i <= pageCount; i++) {
        pages.push(this.getPageButton(i));
      }
    } else {
      pages.push(this.getPageButton(1));

      for (let i = 2; i < pageCount; i++) {
        if (i === 2 && page > 4) {
          pages.push(<span className="pagination-gap" key={i}>…</span>);
          continue;
        }

        if (i === pageCount - 1 && page < pageCount - 3) {
          pages.push(<span className="pagination-gap" key={i}>…</span>);
          continue;
        }

        if (i < page - 1 && page > 4 && i < pageCount - 4) {
          continue;
        }

        if (i > page + 1 && page < pageCount - 3 && i > 5) {
          continue;
        }

        pages.push(this.getPageButton(i));
      }

      pages.push(this.getPageButton(pageCount));
    }

    return pages;
  }

  render() {
    const { pageCount } = this.props;
    const prevClassName = classnames('pagination-btn pagination-prev', { disabled: this.props.page === 1 });
    const nextClassName = classnames('pagination-btn pagination-next ', { disabled: this.props.page >= pageCount });

    return (
      <div className="pagination">
        <button className={prevClassName} onClick={this.onPrevClick}>Previous</button>
        {this.renderPages()}
        <button className={nextClassName} onClick={this.onNextClick}>Next</button>
      </div>
    );
  }
}

export default Pagination;
