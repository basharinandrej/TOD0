import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {BrowserRouter} from "react-router-dom";


const app = (
    <App/>
)

ReactDOM.render(
    <BrowserRouter>
        {/*<React.StrictMode>*/}
            {app}
        {/*</React.StrictMode>*/}
    </BrowserRouter>,
    document.getElementById('root')
);

