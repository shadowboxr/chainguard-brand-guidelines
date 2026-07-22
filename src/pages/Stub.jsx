export default function Stub({ title }) {
  return (
    <div className="stub">
      <header className="stub__hero">
        <div className="stub__inner">
          <h1 className="stub__title">{title}</h1>
        </div>
      </header>
      <div className="stub__body">
        <div className="stub__inner">
          <div className="stub__wip">
            <span className="t-label stub__wip-label">Work in progress</span>
            <p className="stub__wip-text">This section is being written. Check back soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
