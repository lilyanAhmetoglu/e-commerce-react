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
import LoadmoreCards from './loadmoreCards';
import {FontAwesomeIcon }from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faTh} from '@fortawesome/free-solid-svg-icons/faTh';
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
      color: [],
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
    this.showFilteredResults(newFilters); // trigger the new filers in the state after changing

    this.setState({
      filters: newFilters,
    });
  };

  showFilteredResults = (filters) =>{
    this.props.dispatch(getProductsToShop(
        0,
        this.state.limit,
        filters
    )).then(()=>{
        this.setState({
            skip:0
        })
    })
}

loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;

    this.props.dispatch(getProductsToShop(
        skip,
        this.state.limit,
        this.state.filters,
        this.props.products.toShop
    )).then(()=>{
        this.setState({
            skip
        })
    })
}

handleGrid= () =>{
    this.setState({
        grid: !this.state.grid ? 'grid_bars':''
    })
}
  render() {
    const products = this.props.products;
    console.log(this.state.filters);
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
                title="Fabrics"
                list={products.fabrics}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "fabric")
                }
              />
              <CollapseCheckbox
                initState={false}
                title="Colors"
                list={colors}
                handleFilters={(filters) =>
                  this.handleFilters(filters, "color")
                }
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? "" : "active"}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div style={{ clear: "both" }}>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
            </div>
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
