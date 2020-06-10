import React, { Component } from 'react'

import Header from '../Header_Footer/Header'
export default class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                    {this.props.children}
                </div>
                Footer
            </div>
        )
    }
}
