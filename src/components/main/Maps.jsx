import hljs from 'highlight.js';
import { marked } from 'marked';
import { useEffect, useState } from 'react';

export default function Maps({
    
})  {

    const [usage, setUsage] = useState();

    useEffect(() => {
        fetch('../../../public/@styling/usage.md')
        .then(response => response.text())
        .then(data => {
            if (data) {
                // Convert Markdown to HTML
                let htmlContent = marked(data);
        
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
            }
        })
        .catch(error => console.error('Error fetching README:', error));
    }, []);



    return (
        <div className="usage-informations">
            <div  dangerouslySetInnerHTML={{
            __html: usage
        }}>
            
        </div>
        </div>
    )
}