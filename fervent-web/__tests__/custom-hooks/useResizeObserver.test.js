import { renderHook } from "@testing-library/react";
import '@testing-library/jest-dom';
import useResizeObserver from "../../src/custom-hooks/useResizeObserver";

// Mock implementation for global ResizeObserver.
ResizeObserver.mockImplementation(
    jest.fn((impl) => {
        const map = new Map();

        return {
            observe: jest.fn((node) => {
                map.set(node, { target: node, contentRect: { width: 200 }});
                impl([...map.values()]); // Mock observer entries.
            }),
            unobserve: jest.fn((node) => map.delete(node)),
            disconnect: jest.fn(map.clear()),
        }
    })
);

describe("useResizeObserver", () => {
    let resultWidth;
    const observerCallback = jest.fn((entries) => {
        const [entry] = entries;
        resultWidth = entry.contentRect.width;
    });
    const observerOptions = {};

    it("should observer the element size.", async () => {
        const mockElement = document.createElement("div");
        renderHook(() => useResizeObserver(mockElement, observerOptions, observerCallback));

        expect(observerCallback).toHaveBeenCalledTimes(1);
        expect(resultWidth).toBe(200);
    });
});