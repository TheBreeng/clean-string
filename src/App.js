import { useState, useEffect, useCallback } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useClipboard } from 'use-clipboard-copy';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
    const [inputString, setInputString] = useState('');
    const [resultString, setResultString] = useState('');

    const delimiters = [
        { delimiterSymbol: ' | ', delimiterName: 'Вертикальная линия' },
        { delimiterSymbol: ' ', delimiterName: 'Пробел' },
        { delimiterSymbol: ', ', delimiterName: 'Запятая' },
        { delimiterSymbol: '; ', delimiterName: 'Точка с запятой' },
    ];
    const [currentdelimiter, setCurrentdelimiter] = useState(
        localStorage.getItem('delimeter') || delimiters[0].delimiterSymbol
    );

    const clipboard = useClipboard();

    const cleanString = (value) => {
        const str = value
            .replace(/\|/g, delimiters[1].delimiterSymbol)
            .trim()
            .replace(/\s+/g, currentdelimiter)
            .trim();

        setResultString(str);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        cleanString(value);
        setInputString(value);
    };

    const handleRadioChange = (event) => {
        const value = event.target.value;
        localStorage.setItem('delimeter', value);
        setCurrentdelimiter(localStorage.getItem('delimeter'));
    };

    useEffect(() => {
        cleanString(inputString);
    }, [currentdelimiter]);

    const copyResultToClipboard = useCallback(() => {
        clipboard.copy(resultString);
    }, [clipboard.copy, resultString]);

    return (
        <div className="App">
            <Container className="mt-5">
                <Row>
                    <Col>
                        <Form className="form">
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h4>Исходная строка</h4>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => handleInputChange(e)}
                                    value={inputString}
                                />
                            </Form.Group>

                            <h4 className="mb-3">Разделитель</h4>

                            <ToggleButtonGroup
                                type="radio"
                                name="options"
                                defaultValue={currentdelimiter}
                                className="mb-3"
                            >
                                {delimiters.map(
                                    ({ delimiterSymbol, delimiterName }, i) => {
                                        return (
                                            <ToggleButton
                                                id={`tbg-radio-${i}`}
                                                value={delimiterSymbol}
                                                onChange={(e) =>
                                                    handleRadioChange(e)
                                                }
                                                key={i}
                                            >
                                                {delimiterName}
                                            </ToggleButton>
                                        );
                                    }
                                )}
                            </ToggleButtonGroup>

                            <Form.Group className="mb-3">
                                <Form.Label>
                                    <h4>Результат</h4>
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    disabled
                                    value={resultString}
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={copyResultToClipboard}
                            >
                                Копировать в буфер обмена
                            </Button>
                        </Form>

                        <p className="mt-4 note">
                            <span>*</span> Лишние пробелы и вертикальные линии
                            автоматически удаляются, но запятые, точки и прочие
                            разделители не изменяются.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
