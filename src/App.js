import { useState, useEffect } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';

function App() {
    const [string, setString] = useState('');
    const [result, setResult] = useState('');

    const separators = [' | ', ' ', ', ', '; '];
    const [separator, setSeparator] = useState(separators[0]);

    const cleanString = (value) => {
        const str = value.replace(/\s+/g, ' ').trim();

        switch (separator) {
            case separators[0]:
                setResult(str.replace(/ /g, separator));
                break;

            default:
                setResult(str);
                break;
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        setString(value);
        cleanString(value);
    };

    const handleRadioChange = (event) => {
        setSeparator(event.target.value);
    };

    useEffect(() => {
        cleanString(string);
    }, [separator]);

    return (
        <div className="App">
            <Form className="form">
                <Form.Group className="mb-3">
                    <Form.Label>String</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={(e) => handleInputChange(e)}
                        value={string}
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
                        value={result}
                    />
                </Form.Group>
            </Form>
        </div>
    );
}

export default App;
