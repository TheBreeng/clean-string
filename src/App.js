import { useState, useEffect, useCallback } from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useClipboard } from 'use-clipboard-copy';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function App() {
    const [inputString, setInputString] = useState('');
    const [resultString, setResultString] = useState('');

    const separators = [
        { separatorSymbol: ' | ', separatorName: 'Вертикальная линия' },
        { separatorSymbol: ' ', separatorName: 'Пробел' },
        { separatorSymbol: ', ', separatorName: 'Запятая' },
        { separatorSymbol: '; ', separatorName: 'Точка с запятой' },
    ];
    const [currentSeparator, setCurrentSeparator] = useState(
        separators[0].separatorSymbol
    );

    const clipboard = useClipboard();

    const cleanString = (value) => {
        const str = value
            .replace(/\|/g, separators[1].separatorSymbol)
            .trim()
            .replace(/\s+/g, currentSeparator)
            .trim();

        setResultString(str);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;

        cleanString(value);
        setInputString(value);
    };

    const handleRadioChange = (event) => {
        setCurrentSeparator(event.target.value);
    };

    useEffect(() => {
        cleanString(inputString);
    }, [currentSeparator]);

    const copyResultToClipboard = useCallback(() => {
        clipboard.copy(resultString);
    }, [clipboard.copy, resultString]);

    return (
        <div className="App">
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
                    defaultValue={separators[0].separatorSymbol}
                    className="mb-3"
                >
                    {separators.map((separator, i) => {
                        return (
                            <ToggleButton
                                id={`tbg-radio-${i}`}
                                value={separator.separatorSymbol}
                                onChange={(e) => handleRadioChange(e)}
                            >
                                {separator.separatorName}
                            </ToggleButton>
                        );
                    })}
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
                <Button variant="primary" onClick={copyResultToClipboard}>
                    Копировать в буфер обмена
                </Button>
            </Form>

            <p className="mt-4 note">
                <span>*</span> Лишние пробелы и вертикальные линии автоматически
                удаляются, но запятые, точки и прочие разделители не изменяются.
            </p>
        </div>
    );
}

export default App;
