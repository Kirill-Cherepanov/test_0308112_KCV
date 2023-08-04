import { Block } from './Block.';

function App() {
  return (
    <>
      <div className="cool-background">
        <div className="gradient" />
      </div>

      <main className="app">
        <h1 className="head-text orange-gradient">Blocks</h1>
        <Block />
      </main>
    </>
  );
}

export default App;
