
function DevToolsApp() {
  useEffect(() => {
    console.log('hello from devtools');
  }, []);
  return (
    <div>
      is this working?
    </div>
  );
}

export default DevToolsApp;
