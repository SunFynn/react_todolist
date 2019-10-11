import React, { Component } from 'react';
import "./css/index.css";
import Item from "./components/Item";
import Footer from "./components/Footer";

export default class App extends Component {
  constructor(){
    super();
    this.state={
      todoDatas:[],   //存放所有的事件
      todoNum:0,       //8.todoNum未完成事件的条数
      view:"all" ,    //过滤数据
      flag:true       //全选或者全不选
    }
  }

  //1.添加todo
  addTodo=(e)=>{
    let {todoDatas,todoNum}=this.state;
    if(e.target.value!==""&&e.keyCode===13){
      let todo={}
      todo.id=new Date().getTime();
      todo.value=e.target.value.trim();
      todo.hasCompleted=false;
      todoDatas.push(todo);
      todoNum++
      e.target.value=""
    }
    this.setState({
      todoDatas,todoNum
    })
  }

  //2.删除todo
  deleteTodo=(todo)=>{
    let {todoDatas,todoNum}=this.state;
    todoDatas=todoDatas.filter(value=>{
      if(todo.id===value.id){
        if(!value.hasCompleted){
          todoNum--
        }
         return false;
      }else{
         return true;
      }
    })
    this.setState({
      todoDatas,todoNum
    })
  }

  //3.更改completed状态
  changeCompleted=(todo)=>{
    let {todoDatas,todoNum}=this.state;
    todoDatas=todoDatas.map(value=>{
        if(todo.id===value.id){
           value.hasCompleted=!value.hasCompleted;
           if(value.hasCompleted){
             todoNum--
           }else{
             todoNum++
           }
        }
        return value
    })
    this.setState({
      todoDatas,todoNum
    })
  }

  //5.改变todo项的value值
  editTodo=(todo)=>{
    let {todoDatas}=this.state;
    todoDatas=todoDatas.map(value=>{
      if(todo.id===value.id){
        value.value=todo.value
      }
      return value
    })
    this.setState({
      todoDatas
    })
    return true;
  }

  //9.数据过滤
  filterTodo=(view)=>{
     this.setState({
       view
     })
  }

  //10.删除所有已完成项
  clearComponent=()=>{
    let {todoDatas}=this.state;
    todoDatas=todoDatas.filter(value=>{
      if(value.hasCompleted){
        return false
      }else{
        return true
      }
    })
    this.setState({
      todoDatas
    })
  }

  //11.全选或者全不选
  selectAll=()=>{
    let {todoDatas,todoNum,flag}=this.state;
    if(flag){
      todoDatas=todoDatas.map(value=>{
         value.hasCompleted=true;
         return value
      })
      todoNum=0
    }else{
      todoDatas=todoDatas.map(value=>{
        value.hasCompleted=false;
        return value
      })
      todoNum=todoDatas.length;
    }
    flag=!flag
    this.setState({
      todoDatas,todoNum,flag
    })
  }

  render() {
    let {todoDatas,todoNum,view}=this.state;
    let {addTodo,deleteTodo,changeCompleted,editTodo,filterTodo,clearComponent,selectAll}=this;
    let filterItems=todoDatas.filter(value=>{
      switch(view){
        case "all":return true;
        case "active":return !value.hasCompleted;
        case "complete":return value.hasCompleted;
      }
    })
    let items=filterItems.map(value=>{
      return <Item todo={value} key={value.id}
                   deleteTodo={deleteTodo}
                   changeCompleted={changeCompleted}
                   editTodo={editTodo}
             />
    })
    return (
      <section className="todoapp">
          <header className="header">
              <h1>Todos</h1>
              <input type="text" className="new-todo"
                     onKeyUp={addTodo}
              />
          </header>
          <section className="main">
            <input type="checkbox" className="toggle-all" onChange={selectAll}/>
            <ul className="todo-list">
                {
                  items
                }
            </ul>
          </section>
          <Footer todoNum={todoNum} filterTodo={filterTodo} clearComponent={clearComponent}/>
      </section>
    )
  }

  componentDidMount(){
    this.setState(JSON.parse(localStorage.getItem("aa")))
  }
  
  componentDidUpdate(){
    localStorage.setItem("aa",JSON.stringify(this.state))
  }
}

