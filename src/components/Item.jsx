import React, { Component } from 'react'

export default class Item extends Component {
    constructor(){
        super();
        this.state={
            inEdit:false,   //是否进入编辑状态
            flag:true
        }
    }

    //4.双击进入编辑状态
    handdleChange=()=>{
        let {todo}=this.props
        this.setState({
            inEdit:true
        },()=>{
            this.refs.myInput.value=todo.value
            this.refs.myInput.focus()
        })
    }
    
    render() {
        let {todo,deleteTodo,changeCompleted,editTodo}=this.props;
        let {handdleChange}=this;
        let {inEdit,flag}=this.state;
        let complete=todo.hasCompleted?"completed":""
        let cla=inEdit?complete+" editing":complete
        return (
            <li className={cla}>
                <div className="view">
                    <input type="checkbox" className="toggle" onChange={()=>changeCompleted(todo)}
                           checked={todo.hasCompleted}
                    />
                    <label onDoubleClick={handdleChange}>
                        {todo.value}
                    </label>
                    <button className="destroy" onClick={()=>deleteTodo(todo)}></button>
                </div>
                <input type="text" className="edit" ref="myInput"
                       onBlur={(e)=>{    //5.失去焦点改变值
                           if(flag){
                                todo.value=e.target.value;
                                if(editTodo(todo)){
                                    this.setState({
                                        inEdit:false
                                    })
                                }
                           }                     
                       }}
                       onKeyUp={(e)=>{
                           if(e.keyCode===13){  //6.回车键改变值
                                todo.value=e.target.value;
                                if(editTodo(todo)){
                                    this.setState({
                                        inEdit:false
                                    })
                                }
                           }
                           if(e.keyCode===27){   //7.esc键不会修改值，且退出编辑状态
                               this.setState({
                                   inEdit:false,
                                   flag:false
                               })
                               setTimeout(()=>{
                                   this.setState({
                                       flag:true
                                   })
                               },10)
                           }
                       }}
                /> 
            </li>
        )
    }
}
