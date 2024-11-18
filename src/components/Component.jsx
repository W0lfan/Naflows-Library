import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import javascript from 'highlight.js/lib/languages/javascript';
import js_beautify from 'js-beautify/js/src/javascript';
hljs.registerLanguage('javascript', javascript);
import 'highlight.js/styles/github.css'; // You can use a different style if you prefer


import '../../public/styles/components/Component.scss';
import PropTypes from 'prop-types';
import { marked } from 'marked';
import { v4 } from 'uuid';
import NaflowsButton from '../../public/@components/button';
import NaflowsInput from '../../public/@components/input';
import NaflowsPicker from '../../public/@components/picker';
import NaflowsSelector from '../../public/@components/select';





export default function Component({ component }) {

    const [usage, setUsage] = useState('');
    const [test1, setTest1] = useState('Option 1');
    const [test2, setTest2] = useState('No button selected');
    const [test3, setTest3] = useState(1);


    const examples = {
        "Picker" : [
            <NaflowsPicker
                key={v4()}
                parameters={{
                    slideType: 'horizontal',
                    justifyContent: 'start',
                    slideStyle: 'center',
                    property : 'normal',
                    autoWidth : false
                }}
                options={[
                    {
                        content: 'Option 1'
                    },
                    {
                        content: 'Option 2'
                    },
                    {
                        content: 'Option 3'
                    }
                ]}
                onChange={(value) => {
                    setTest1(value);
                }}
                value={test1}
            />
        ],
        "Button" : [
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem'
            }} key={v4()}>
                <NaflowsButton
                    key={v4()}
                    type='primary'
                    style={{
                        width: 'fit-content'
                    }}
                    content={['Primary Button']}
                    onUserClick={() => {
                        setTest2('Primary Button');
                    }}
                />
                <NaflowsButton
                    key={v4()}
                    type='secondary'
                    style={{
                        width: 'fit-content'
                    }}
                    content={['Secondary Button']}
                    onUserClick={() => {
                        setTest2('Secondary Button');
                    }}
                />
                <NaflowsButton
                    key={v4()}
                    type='tertiary'
                    style={{
                        width: 'fit-content'
                    }}
                    content={['Tertiary Button']}
                    onUserClick={() => {
                        setTest2('Tertiary Button');
                    }}
                />
            </div>
        ],
        "Input" : [
            <NaflowsInput
                key={v4()}
                onUserInput={(event) => {}}
                placeholder='Enter your name'
                fillCondition={(value) => {
                    return value.length > 5;
                }}
                warning={(value) => {
                    if (value && value.length < 5) {
                        return 'Name must be at least 5 characters long';
                    } else {
                        return '';
                    }
                }}
            />
        ],
        "Select" : [
            <NaflowsSelector
                key={v4()}
                userChoices={[
                    'Option 1',
                    'Option 2',
                    'Option 3'
                ]}
                onUserChange={(value) => {
                    setTest3(value+1);
                }}
                selectedValue={test3-1}
            />
        ]
    }

    useEffect(() => {
        // Convert Markdown to HTML
        let htmlContent = marked(component.usage);

        // Create a DOM parser to parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');

        // Find all <code> elements
        const codeElements = doc.querySelectorAll('code');

        codeElements.forEach(codeElement => {
            // Beautify the code content using js-beautify
            const beautifiedCode =codeElement.textContent;

            // Set the beautified code back into the <code> element
            codeElement.textContent = beautifiedCode;

            // Highlight the code using highlight.js
            hljs.highlightElement(codeElement);
        });

        // Serialize the modified HTML back into a string
        const updatedHtmlContent = doc.body.innerHTML;
        setUsage(updatedHtmlContent);
    }, [component.usage]);


    return (
        <div className='usage-informations component'>
            <div className="usage-informations-header">
                <div className="title">
                    {component.name}
                </div>
                <div className="sub-title">
                    {component.description}<br/>
                    Available at {component.path_to_code}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{
                __html : usage
            }} className="usage">
            </div>
            <div className="examples">
                <div className="title">
                    Example
                </div>
                <div className="component">
                    {examples[component.name]}
                </div>
                <span className='example' id={`${component.name.toLowerCase()}-example`}>
                    {(
                        component.name === 'Select' ?
                        `Option ${test3}` :
                        (component.name === 'Button' ?
                        test2 : test1
                        )
                    )} has been selected
                </span>
            </div>
        </div>
    );
}

Component.propTypes = {
    component: PropTypes.object.isRequired
};

