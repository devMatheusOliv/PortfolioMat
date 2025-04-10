// Hook para gerenciar o estado de expansão dos cards
function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = React.useState(initialState);
  const contentRef = React.useRef(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded]);

  const toggleExpand = React.useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, contentRef, height };
}
