import React, { Component } from 'react';
import { connect } from 'react-redux';

class ItemList extends Component {

    state = {
        description: "",
        imageUrl: "",
    }
    componentDidMount() {
        this.props.dispatch({ type: "GET_ITEMS" });
    }


    render() {
        return (
            <>
                <ul>
                    {this.props.itemsReducer.map((item, i) =>
                        <div key={i}>
                            <li key={i}>
                                {item.description}
                                <img src={item.image_url} alt=""/>
                            </li>
                        </div>)}
                </ul>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </>
        )
    }
}

const map = reduxState => reduxState;

export default connect(map)(ItemList);