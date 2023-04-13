import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const mockResponse = { message: [3] };
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockResponse)
  })
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders input element', () => {
  render(<App />);
  expect(screen.getByTestId("input")).toBeInTheDocument();
});

test('renders button', () => {
  render(<App />);
  expect(screen.getByRole("button")).toHaveTextContent(/Get Median/);
});

test("should call onClick successfully", async () => {
  render(<App />);
  const button = screen.getByRole('button');
  const input = screen.getByTestId('input');
  
  fireEvent.change(input, { target: { value: '7' } });
  fireEvent.click(button);
  await waitFor(() => {
    const div = screen.getByTestId('median');
    expect(div).toContainHTML('3');
  });
  
});