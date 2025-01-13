/**
 * Scrolls current ref into view.
 * @param {React.MutableRefObject} componentRef
 */
export const scrollToBottom = (componentRef) => {
    componentRef.current?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Scrolls messages pane into the current scroll top position saved in the state.
 * @param {React.MutableRefObject} componentRef
 * @param {number} scrollTopPosition
 */
export const scrollToPosition = (componentRef, scrollTopPosition) => {
    componentRef.current?.scrollTo({ top: scrollTopPosition, behavior: "smooth" });
};