import { useEffect, useRef } from "react";

/**
 * A hook that adds event listeners to elements and cleans them up when the component unmounts. 
 * @param {string} type Event type
 * @param {Function} handler Event handler
 * @param {HTMLElement} element Target element
 */
function useEventListener(type, handler, element) {
    const savedHandler = useRef(); // Creating a ref to store the event handler.
    console.log("Custom Hook: Target:", element);

    useEffect(() => {
        savedHandler.current = handler; // Saving/updating the event handler.
        console.log("Custom Hook: Current handler:", savedHandler);
    }, [handler]);

    useEffect(() => {
        const listener = event => savedHandler.current(event); // Set callback that be invoked when event is dispatched.

        if (element) {
            element.addEventListener(type, listener); // Add event listener to element.
            console.log("Custom Hook: Added Listeners.", element);
        }

        // Destroy: Triggers when unmounting component.
        return () => {
            if (element) {
                element.removeEventListener(type, listener); // Remove event listener when the component unmounts.
                console.log("Custom Hook: Listeners Removed.");
            }
        };
    }, [type, element]);
}

export default useEventListener;