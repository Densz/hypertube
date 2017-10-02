import React, { Component } from 'react';
import { Route, Router } from 'react-router';
import Form from "./components/Form/form.js";

export default (
    <Router>
        <Route path="/" component={ Form } />
    </Router>
)