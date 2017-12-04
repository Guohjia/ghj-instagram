import React from 'react';
import { render } from 'react-dom';
import CPT_1 from './cpt_1';
import CPT_2 from './cpt_2';

const router = (
    <div>
        <CPT_1 />
        <CPT_2 />
    </div>
)
render(router, document.getElementById('root'))