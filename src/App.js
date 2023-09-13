import { useState, useEffect, useCallback } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useClipboard } from 'use-clipboard-copy';

function App() {
    const [inputString, setInputString] = useState('');
    const [resultString, setResultString] = useState('');

    const separators = [' | ', ' ', ', ', '; '];
    const [separator, setSeparator] = useState(separators[0]);

    const clipboard = useClipboard();

    const cleanString = (value) => {
        const str = value
            .replace(/\|/g, ' ')
            .trim()
            .replace(/\s+/g, separator)
            .trim();

        setResultString(str);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        cleanString(value);
        setInputString(value);
    };

    const handleRadioChange = (event) => {
        setSeparator(event.target.value);
    };

    useEffect(() => {
        cleanString(inputString);
    }, [separator]);

    const copyResultToClipboard = useCallback(() => {
        clipboard.copy(resultString); // programmatically copying a value
    }, [clipboard.copy, resultString]);

    return (
        <div className="App">
            <Form className="form">
                <Form.Group className="mb-3">
                    <Form.Label>String</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => handleInputChange(e)}
                        value={inputString}
                    />
                </Form.Group>

                <p>Separator</p>

                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <Form.Check
                            inline
                            label="|"
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            defaultChecked
                            value={separators[0]}
                            onChange={(e) => handleRadioChange(e)}
                        />
                        <Form.Check
                            inline
                            label="Space"
                            name="group1"
                            type={type}
                            id={`inline-${type}-2`}
                            value={separators[1]}
                            onChange={(e) => handleRadioChange(e)}
                        />
                        {/* <Form.Check
                            inline
                            label=","
                            name="group1"
                            type={type}
                            id={`inline-${type}-3`}
                            value={separators[2]}
                            onChange={(e) => setSeparator(e.target.value)}
                        />
                        <Form.Check
                            inline
                            label=";"
                            name="group1"
                            type={type}
                            id={`inline-${type}-4`}
                            value={separators[3]}
                            onChange={(e) => setSeparator(e.target.value)}
                        /> */}
                    </div>
                ))}

                <Form.Group className="mb-3">
                    <Form.Label>Result</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        disabled
                        value={resultString}
                    />
                </Form.Group>
                <Button variant="primary" onClick={copyResultToClipboard}>
                    Copy result
                </Button>
            </Form>
        </div>
    );
}

export default App;
