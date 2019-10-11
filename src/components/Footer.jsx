import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        let {todoNum,filterTodo,clearComponent}=this.props
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{todoNum}</strong>
                    <span>{todoNum>1?"items":"item"} left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a href="#/all" onClick={()=>filterTodo("all")}>All</a>
                    </li>
                    <li>
                        <a href="#/active" onClick={()=>filterTodo("active")}>Active</a>
                    </li>
                    <li>
                        <a href="#/complete" onClick={()=>filterTodo("complete")}>Complete</a>
                    </li>
                </ul>
                <button className="clear-completed" onClick={()=>clearComponent()}>
                    Clear commpleted
                </button>
            </footer>
        )
    }
}
