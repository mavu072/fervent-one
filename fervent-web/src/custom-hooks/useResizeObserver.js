import { useEffect } from "react";

/**
 * A hook that observes an element using ResiveObserver.
 * @param {Element} element The element to observe.
 * @param {ResizeObserverOptions} options An object to set options for the observation. Warning: If you define this in a component body, you must memoize it.
 * @param {ResizeObserverCallback} observerCallback The function called whenever an observed resize occurs. Warning: If you define this in a component body, you must memoize it.
 * @returns void
 */
function useResizeObserver(element, options, observerCallback) {
    useEffect(() => {
        //  Did component mount.
        if (!element || !('ResizeObserver' in window)) {
            return undefined;
        }

        const observer = new ResizeObserver(observerCallback);
        // Observe element.
        observer.observe(element, options);

        // Cleanup when unmounting component.
        return () => {
            observer.disconnect();
        }
    }, [element, options, observerCallback]);
}

export default useResizeObserver;