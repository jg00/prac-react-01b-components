import React, { Component } from "react";
// import React, { Component, Fragment } from "react";  // For React.Fragment

import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass2";
import classes from "./Person.css";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  /*
    I HOCs
    - Note on render() has to return one root element and then children elements.  
      However we can return adjacent JSX elements without a root but instead an array of elements
      but also needs to be provided the key.  Eventually this is an array of React.CreateElement().
      return [ , , , ]

      return [
        <p key='i1' onClick={this.props.click}>
            I am {this.props.name} and I am {this.props.age} years old!
          </p>, 
        <p key='i2'>{this.props.children}</p>,
        <input key='i3'>test</input>
      ]

    - Create an HOC as a wrapper is one alternative and we would us it as a wrapping component that does not render any actual HTML code but just
      there to fulfil React's requirement of having a wrapping expression.
        <Aux></Aux> is behaving as one root React.createElement() call to fulfill React's requirement.
      
    
    - React.Fragment is another option that comes with 16.2.
        Surround with <React.Fragment>...</React.Fragment>
        Or import Fragment from React and just use <Fragment>...</Fragment>
  */

  /*
    II Using "ref" keyword property
    a. One approach applied only in class components (not in functional components)

      ref={inputEl => {
            this.inputElement = inputEl;
          }}
      
      inputEl - argument is a reference to the JSX element you are placing 'ref' property on.
      this.inputElement (inside render() we add/create this 'global' property associted to 'this') 
        - you can add any property to this 'class' which will hold your inputEl

    b. Another approach requires us to use the constructor and use React.createRef().
          
  */

  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  /*
    In React 16.6 added 'static contextType' property which is another way of using Context that allows you
    to access Context at class component level and not just in your render() JSX code.

    The contextType property on a class can be assigned a Context object created by 
    React.createContext().

    Now you have a new 'this.context' property available in this class component.

    Only available in class components but not functional components.
  */

  static contextType = AuthContext; // Assign to it a Context object which you can access using 'this.context'.

  componentDidMount() {
    // In regular Javascript you could after component renders, you could set focus on the last element.
    // However this does not refer to the component rendered here.  Do no update the DOM directly.
    // document.querySelector("input").focus(); // Howerver this would always set focus on the first one found.

    // this.inputElement.focus();
    this.inputElementRef.current.focus(); // .current element - gives you access to your current reference.

    // Now we have access to our Context
    // console.log(this.context.login)
    console.log("==context==", this.context.authenticated);
  }

  render() {
    console.log("[Person.js rendering...");
    return (
      <Aux>
        {this.context.authenticated ? (
          <p>Authenticated!</p>
        ) : (
          <p>Please log in</p>
        )}

        {/* Kept for reference.  Replaced with 'static contextType'
        <AuthContext.Consumer>
          {context =>
            context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>
          }
        </AuthContext.Consumer> */}

        {/* {this.props.isAuth ? <p>Authenticated!</p> : <p>Please log in</p>} */}

        {/* <Fragment> */}
        <p onClick={this.props.click}>
          I am {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="i2">{this.props.children}</p>
        <input
          key="i3"
          // One way left here for reference
          // ref={inputEl => {
          //   this.inputElement = inputEl;  // You are adding/creating a .inputElement(any name) here on render.  Then on componentDidMout() you have access to it and set .focus()
          // }}

          ref={this.inputElementRef}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        {/* </Fragment> */}
      </Aux>
    );
  }
}

/*
  'prop-types' package:
  After defining either a class or functional component you can define PropTypes here.

  Add property to Person.propTypes is a special property which you add to any Javascript 'Component Object'
  that React will watch out for 'in development mode' and React will give you a warning if you pass in 
  incorrect props.

  Provide object of key:value pairs and now using PropTypes you defined at the top upon import
*/

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass(Person, classes.Person);

/* Original before wrapping in Aux
  render() {
    console.log("[Person.js rendering...");
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I am {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>

        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

export default Person;
*/

/*
// Full code before converting to class based component used to see Update Lifecycle Component 
import React from "react";

import classes from "./Person.css";

const person = props => {
  console.log("[Person.js rendering...]");
  return (
    <div className={classes.Person}>
      <p onClick={props.click}>
        I am {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>

      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;


*/
