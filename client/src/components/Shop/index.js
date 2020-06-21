import React, { Component } from "react";
import PageTop from "../utils/page_top";

import { price, colors } from "../utils/Forms/fixed_categories";

import { connect } from "react-redux";
import {
  getProductsToShop,
  getBrands,
  getFabrics,
  getCategories,
} from "../../actions/products_actions";

import CollapseCheckbox from "../utils/collapseCheckbox";
import CollapseRadio from "../utils/collapseRadio";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      fabric: [],
      category: [],
      price: [],
    },
  };

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getFabrics());
    this.props.dispatch(getCategories());
    this.props.dispatch(
      getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    );
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters }; // on change for all checkboxes and radios will be saved in the filter state
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.setState({
      filters: newFilters,
    });
  };

  render() {
    console.log(this.state.filters);
    const products = this.props.products;
    return (
      <div>
        <PageTop title="Browse Bags" />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "brand")
                }
              />
              <CollapseCheckbox
                initState={true}
                title="Categories"
                list={products.categories}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "category")
                } // getting filters from handlerFilters from children compnent
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "price")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="fabrics"
                list={products.fabrics}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "fabric")
                }
              />
              <CollapseRadio
                initState={false}
                title="Color"
                list={colors}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "price")
                }
              />
            </div>
            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(Shop);
