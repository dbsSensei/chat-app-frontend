/* eslint-disable linebreak-style */
import React, { useState } from 'react';

import classes from './TestArea.module.css';

function TestArea({ onMessage }) {
  const [state, setState] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    onMessage(state);
    setState('');
  }

  function onChange(event) {
    const value = event.target.value;

    setState(value);
  }

  return (
    <div className={classes.testAreaWrapper}>
      <form className={classes.testArea} onSubmit={handleSubmit}>
        <div className={classes.testAreaPreamble}>
          Test the chat window by sending a message:
        </div>
        <textarea
          className={classes.testAreaText}
          placeholder='Write a test message....'
          value={state}
          onChange={onChange}
        />
        <button className={classes.testAreaButton}> Send Message! </button>
      </form>
    </div>
  );
}

export default TestArea;
