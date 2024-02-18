import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from='PLN' to='USD' amount={666} />);
    });

    it('should render proper info about conversion when PLN -> USD', () => {
        const testCasesPLNtoUSD = [
            { amount: '100', from: 'PLN', to: 'USD', result: 'PLN 100.00 = $28.57' },
            { amount: '20', from: 'PLN', to: 'USD', result: 'PLN 20.00 = $5.71'},
            { amount: '200', from: 'PLN', to: 'USD', result: 'PLN 200.00 = $57.14' },
            { amount: '345', from: 'PLN', to: 'USD', result: 'PLN 345.00 = $98.57' },
        ];

        for (const testObj of testCasesPLNtoUSD) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const resultBoxDiv = screen.getByTestId('resultBoxDiv');
            expect(resultBoxDiv).toHaveTextContent(testObj.result);
            cleanup();
        }
    });

    it('should render proper info about conversion when USD -> PLN', () => {
        const testCasesUSDtoPLN = [
            { amount: '100', from: 'USD', to: 'PLN', result: '$100.00 = PLN 350.00' },
            { amount: '20', from: 'USD', to: 'PLN', result: '$20.00 = PLN 70.00'},
            { amount: '200', from: 'USD', to: 'PLN', result: '$200.00 = PLN 700.00' },
            { amount: '345', from: 'USD', to: 'PLN', result: '$345.00 = PLN 1,207.50' },
        ];

        for (const testObj of testCasesUSDtoPLN) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const resultBoxDiv = screen.getByTestId('resultBoxDiv');
            expect(resultBoxDiv).toHaveTextContent(testObj.result);
            cleanup();
        }
    });

    it('should render proper info when trying to convert USD -> USD', () => {
        const testCasesUSDtoUSD = [
            { amount: '342', from: 'USD', to: 'USD', result: '$342.00 = $342.00' },
            { amount: '234', from: 'USD', to: 'USD', result: '$234.00 = $234.00'},
        ];

        for (const testObj of testCasesUSDtoUSD) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const resultBoxDiv = screen.getByTestId('resultBoxDiv');
            expect(resultBoxDiv).toHaveTextContent(testObj.result);
            cleanup();
        }
    });
    
    it('should render proper info when trying to convert PLN -> PLN', () => {
        const testCasesPLNtoPLN = [
            { amount: '350', from: 'PLN', to: 'PLN', result: 'PLN 350.00 = PLN 350.00' },
            { amount: '543', from: 'PLN', to: 'PLN', result: 'PLN 543.00 = PLN 543.00'},
        ];

        for (const testObj of testCasesPLNtoPLN) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const resultBoxDiv = screen.getByTestId('resultBoxDiv');
            expect(resultBoxDiv).toHaveTextContent(testObj.result);
            cleanup();
        }
    });

    it('should return "Wrong value" when trying to convert amount lower than zero', () => {
        const testCasesNegative = [
            { amount: '-100', from: 'PLN', to: 'USD', result: 'Wrong value' },
            { amount: '-1', from: 'USD', to: 'PLN', result: 'Wrong value'},
            { amount: '-2134142', from: 'PLN', to: 'USD', result: 'Wrong value'},
            { amount: '-123', from: 'USD', to: 'PLN', result: 'Wrong value'},
        ];

        for (const testObj of testCasesNegative) {
            render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
            const resultBoxDiv = screen.getByTestId('resultBoxDiv');
            expect(resultBoxDiv).toHaveTextContent(testObj.result);
            cleanup();
        }
    });
});